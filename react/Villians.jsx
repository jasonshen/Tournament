import React from 'react';
import VillianCard from './villianCard.jsx';
import db from'../firebase.js';
import axios from 'axios';

class Villians extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			villians: []
		}
		this.report = this.report.bind(this);
	}

	componentDidMount() {
		db.ref('images').once('value', snap => {
		  if (snap.val()) {
		  	console.log(Object.values(snap.val()));
		    this.setState({villians: Object.values(snap.val())});
		  }
		});
	}

	report(url) {
		console.log('reporting url: ', url);
		axios.post('/api/report', {url: url}).then(response => {
			console.log('response from server: ', response);
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
		<div>
			<h1>Click on a card to report the villian to Gotham Police!</h1>
			<div>
				{this.state.villians.map((villian, i) => {
					return (
					<div key={i} onClick={() => {this.report(villian[0])}}>
						<VillianCard imageUrl={villian[0]} closestMatch={villian[1]} percent_match={villian[2]} />
					</div>
					);
				})}
			</div>
		</div>
		);
	}
}

export default Villians;