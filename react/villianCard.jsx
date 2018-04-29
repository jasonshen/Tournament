import React from "react";

class villianCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "borderRadius": 2, "borderColor": "black"}}>
		{this.props.imageUrl === "" ? null : <img src={this.props.imageUrl} style={{"height": 150, "width": 150}}/>}
		{this.props.closestMatch === "" ? null : <div><h3>Closest Match:</h3><p>{this.props.closestMatch}</p></div>}
		{this.props.percent_match === null ? null : <div><h3>Percent Match:</h3><p>{this.props.percent_match}</p></div>}
	</div>
	}
}

export default villianCard;