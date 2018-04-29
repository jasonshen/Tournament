import React from 'react';

const Upload = ({ handleOnSubmit, onChangeCB }) => {
    return (
        <div>
            <form onSubmit={handleOnSubmit} id="uploadForm">
                <input type="file" name="image" onChange={onChangeCB} />
                <input style={buttonStyle} type="submit" value="Upload" />
            </form>
        </div>
    );
};

export default Upload;

const buttonStyle = {
    fontSize: '2em',
    borderRadius: '10px',
    color: '#ffffff',
    background: '#07617D',
    padding: '10px 20px 10px 20px',
    boxShadow: '-2px 2px 6px lightGrey'
};
