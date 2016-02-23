/*
Inventory
*/
import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';

import Firebase from 'firebase';
import config from '../config';
const ref = new Firebase(config.firebaseUrl);

@autobind
class Inventory extends React.Component {

	constructor() {
		super();

		this.state = {
			uid : ''
		}
	}

	authenticate(provider) {
		console.log('Trying to auth with ' + provider);
		ref.authWithOAuthPopup(provider, this.authHandler)
	}

	componentWillMount() {
		console.log('Checking to see of we can log them in')

		var token = localStorage.getItem('token')
		if(token) {
			ref.authWithCustomToken(token, this.authHandler)
		}
	}

	authHandler(err, authData) {
		console.log(authData)

		if(err) {
			console.log(err)
			return
		}

		// dave the login token in the browser
		localStorage.setItem('token', authData.token)

		console.log(this.props.params.storeId)
		const storeRef = ref.child(this.props.params.storeId)

		storeRef.on('value', (snapshot) => {
			var data = snapshot.val() || {}

			if(!data.owner) {
				// claim it as our own as if there is no owner already

				storeRef.set({ owner: authData.uid })
			}

			// update our state to reflect the current store owner and user
			this.setState({
				uid: authData.uid,
				owner: data.owner || authData.uid
			})
		})
	}

	logout() {
		ref.unauth()
		localStorage.removeItem('token')
		this.setState({ uid: null })
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
				<button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Log In with Facebook</button>
				<button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Log In with Twitter</button>
			</nav>
		)
	}

	renderInventory(key) {
		var linkState = this.props.linkState;
		return (
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.'+key+'.name')} placeholder="Fish Name" />
				<input type="text"  valueLink={linkState('fishes.'+key+'.price')} placeholder="Fish Price" />
				<select  valueLink={linkState('fishes.'+key+'.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text"  valueLink={linkState('fishes.'+key+'.desc')} placeholder="Desc"></textarea>
				<input type="text"  valueLink={linkState('fishes.'+key+'.image')} placeholder="URL to Image" />
				<button onClick={this.props.removeFish.bind(null, key)}>Remove fish</button>
			</div>
		)
	}

	render() {
		let logoutBtn = <button onClick={this.logout}>Log Out!</button>

		// first if user isn't logged in
		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		// then check if they aren't the owner of the current store
		if(this.state.uid !== this.state.owner) {
			return <div><p>Sorry, you aren't the owner of this store</p>{logoutBtn}</div>
		}

		return (
			<div>
				<h2>Inventory</h2>
				{logoutBtn}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	linkState: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired
}

export default Inventory;