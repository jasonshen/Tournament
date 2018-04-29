import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import avatar from '../gotham.jpg'

class NewSubmission extends Component {
  constructor(props) {
    super()
    this.state = {
      preview: null,
      fileData: null,
    }

    this.onImageDrop = this.onImageDrop.bind(this)
  }

  onImageDrop(files) {
    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const result = event.target.result
      this.setState({
        preview: file.preview,
        fileData: result
      });
    }

    reader.readAsDataURL(file)
  }

  render () {
    const { fileData, preview, error } = this.state

    return (
        <div>
        <header className="tc pv4 pv5-ns">
          <img src={avatar} className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
          <h1 className="f5 f4-ns fw6 mid-gray">Gotham City Police Lookup</h1>
          { preview
            ?
              <div
                className="db center mw5 tc black dim"
                onClick={() => {
                  this.props.handleImageUpload(this.state.fileData)
                  .then(this.setState({
                    preview: null,
                    fileData: null,
                  }))
                }}
              >
                <span className='tc f6 gray fw2 ttu tracked'>Analyze Image </span>
                <img src={preview} className="db ba b--black-10" alt=""/>
              </div>
            :
              <Dropzone
                className='tc f6 gray fw2 ttu tracked'
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop}
              >
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
          }
        </header>
          {
            // fileData
            // ? <div >"Click to analyze!"</div>
            // : "Choose an image for analysis!"
          }


        </div>
    )
  }
}

export default NewSubmission
