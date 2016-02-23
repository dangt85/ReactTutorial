/*
Header
*/
import React from 'react';

var Header = React.createClass({
	render: function() {
		return (
			<header className="top">
				<h1>Catch
				<span className="ofThe">
					<span className="of">of</span>
					<span className="the">the</span>
				</span>
				day</h1>
				<h3><span>{this.props.tagline}</span></h3>
			</header>
		);
	},
	propTypes: {
		tagline: React.PropTypes.string.isRequired,
		num: React.PropTypes.number
	}
});

export default Header;