import React from 'react';

const ImageUpload = (props) => {
  return (
	<form onSubmit={props.handleUpload} className="image-upload container">
		<h3 className="item">Upload Image Here</h3>
		<input className="item" name="image" type="file" accept="image/*"/>
		<button type="submit" className="item"><h2>Upload image</h2></button>
	</form>
  )
}

export default ImageUpload;