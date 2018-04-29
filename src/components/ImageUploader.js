import React, { Component, Fragment } from "react";

class ImageUploader extends Component {
  state = { selectedFile: null };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    this.props.imagePost(this.state);
  };

  render() {
    return (
      <Fragment>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button>
      </Fragment>
    );
  }
}

export default ImageUploader;
