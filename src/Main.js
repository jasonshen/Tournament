import React, { Component } from 'react';

import Info from './Info'
import ImageUpload from './ImageUpload'
import VillainContainer from './VillainContainer'

import { message } from 'antd';

class Main extends Component {

	state = {
		results: [],
		reported: []
	}

	lookupImage = image => {
		fetch("https://www.headlightlabs.com/api/gcpd_lookup", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				api_key: process.env.REACT_APP_API_KEY,
				image_contents: image.target.result
			})
		})
		.then(res => res.json())
		.then(json => {
			if (json.errors) {
				message.error('There was an error uploading your image. Refresh and try again.')
			} else {
				this.setState({
					results: [
						...this.state.results, 
						{...json, base64: image.target.result}
					]
				})
			}
		})
		.catch(err => console.log(err))
	}

	handleUpload = e => {
		e.preventDefault()
		const image = e.target.image.files[0]
		const reader = new FileReader()

		reader.onloadend = this.lookupImage

		reader.readAsDataURL(image)
	}

	reportVillain = villain => {
		fetch("https://www.headlightlabs.com/api/gcpd_report", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				api_key: process.env.REACT_APP_API_KEY,
				image_contents: villain.base64
			})
		})
		.then(res => res.json())
		.then(json => {
			if (json.errors) {
				message.error('There was an error reporting the villain. Try again soon')
			} else {
				this.setState({reported: [...this.state.reported, this.state.results.indexOf(villain)]})
			}	
		})
		.catch(err => console.log(err))

	}

	render() {
		return (
			<div className="main">
				<Info />
				<ImageUpload handleUpload={this.handleUpload}/>
				<VillainContainer results={this.state.results} reportVillain={this.reportVillain} reported={this.state.reported} />
			</div>
		);
	}
}

export default Main
