/*
	Fish
*/
import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

class Fish extends React.Component {
	
	@autobind
	onButtonClick() {
		console.log("Going to add the fish: ", this.props.index);
		var key = this.props.index;
		this.props.addToOrder(key);
	}

	render() {
		var details = this.props.details;
		var isAvailable = details.status === 'available';
		var btnTxt = (isAvailable ? 'Add to Order' : 'Sold Out');
		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{btnTxt}</button>
			</li>
		)
	}
}

export default Fish;