import React from 'react'
import { Form, Input, Button, Icon, Message, Container, Segment} from 'semantic-ui-react'
import {Adapter} from '../services'

class Upload extends React.Component {
  constructor(){
    super()
    this.state = {
      submissions: 0
    }
  }

  render(){
    return (
      <Container>
      <Segment>
        <h2>Upload a photo of the suspected super villian!</h2>
        <Form key={this.state.submissions} warning={this.props.uploadError} onSubmit={(event) => { this.props.uploadPhoto(event); this.setState({submissions: this.state.submissions++})}}>
          <Form.Input key={this.state.submissions} size="huge" type="file" /> <br/>
          <Button size='massive' primary type="submit"><Icon name='photo' />Send Photo to Headquarters for Processing</Button>
          <Message warning header='Error' content={this.props.uploadError}/>
        </Form>
        </Segment>
      </Container>
    )
  }
}

export default Upload
