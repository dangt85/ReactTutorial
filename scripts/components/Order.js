/*
Order
*/
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';
import autobind from 'autobind-decorator';

class Order extends React.Component {

	@autobind
	renderOrder(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		var removeBtn = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>;

		if(!fish) {
			return <li key={key}>Sorry, fish no longer available! {removeBtn}</li>
		}

		return (
			<li key={key}>
				<span>
					<CSSTransitionGroup component="span" transitionName="count"
						transitionEnterTimeout={250} transitionLeaveTimeout={250}>
						<span key={count}>{count}</span>
					</CSSTransitionGroup>
					lbs
					{fish.name}
					{removeBtn}
				</span>
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>
		)
	}

	render() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key) => {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if(fish && isAvailable) {
				return prevTotal + (count * parseInt(fish.price) || 0);
			}

			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<CSSTransitionGroup component="ul" className="order" 
					transitionName="order" transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</CSSTransitionGroup>
			</div>
		);
	}
}

Order.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func
}

export default Order;