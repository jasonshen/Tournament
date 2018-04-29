import React from "react";
import ImageUploader from './ImageUploader.jsx';
import Villians from './Villians.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			villians: []
		};
		this.addVillian = this.addVillian.bind(this);
	}

	addVillian(v) {
		console.log('adding villian: ', v);
		// make a copy to avoid mutating state before calling setState
		let vills = this.state.villians.slice();
		vills.push(v);
		this.setState({
			villians: vills
		});
	}

	render() {
		return (
	  <div className="app">
	    <h1>Gotham Villian Matcher!</h1>
	    <ImageUploader addVillian={(v) => {this.addVillian(v)}}/>
	    <Villians villians={this.state.villians} />
	  </div>
	  )
	}
};

export default App;
