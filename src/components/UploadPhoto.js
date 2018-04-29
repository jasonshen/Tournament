import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhotoToServer } from '../store/photo';
import { getPhotoData } from '../store/photoData';


class UploadPhoto extends Component {
    constructor() {
        super();
        this.state = {
            dataUri: '',
            photo: ''
        }

        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let payload = {
            api_key: 'ZcWnM_2Gs8s2xWFB-p-hhw',
            image_contents: this.state.dataUri
        };
        this.props.getPhotoData(this.state.dataUri);
        console.log(this.props.user)
        this.props.uploadPhotoToServer(payload, this.props.user.id || null);
    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0]

        reader.onload = (upload) => {
            this.setState({
                dataUri: upload.target.result
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <div className='card-body'>
                {!this.props.user.id ? <p> Login to view past results</p> : null}
                    <h1>Upload an image to check the GCBD villain database</h1>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input className='form-control' onChange={this.handleFile} type="file" />
                        <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadPhotoToServer: (payload, userId) => {
            dispatch(uploadPhotoToServer(payload, userId));
        },
        getPhotoData: (data) => {
            dispatch(getPhotoData(data));
        }
    }
}

export default connect(null, mapDispatchToProps)(UploadPhoto);