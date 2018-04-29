import React from "react";
import axios from 'axios';
import VillianCard from './villianCard.jsx';

class ImageUploader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageUrl: "",
			closestMatch: "",
			percent_match: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.fileName.value);
		// console.log('sending the following data: ', data.get('fileName'), ': ', data.get('file'));
		axios.post('/api/images', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => {
			console.log('response from server: ', response.data);
			this.setState({
				imageUrl: response.data.location,
				closestMatch: response.data.closest_match,
				percent_match: response.data.percent_match 
			}, () => {
				this.props.addVillian(this.state);
			});
		}).catch(err => {
			console.log('error from server: ', err);
		})
	}

	render() {
		return (
			<div>
				<h1>Image Uploader</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
	        	<input ref={(ref) => { this.uploadInput = ref; }} type="file" />
	        </div>
	        <div>
	          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
	        </div>
	        <br />
	        <div>
	          <button>Upload</button>
	        </div>
				</form>

				<VillianCard imageUrl={this.state.imageUrl} closestMatch={this.state.closestMatch} percent_match={this.state.percent_match} />
			</div>

			)
	}
}

export default ImageUploader;