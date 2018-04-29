import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const ImageUploadForm = (props) => {

  return(
    <Form onSubmit={props.handleSubmit}>
      <Form.Input
        label='Upload Image of Villan'
        placeholder='upload an image'
        type='file'
        onChange={props.handleChange}
      />
      <Button>Submit</Button>
    </Form>
    
  )
}

export default ImageUploadForm
