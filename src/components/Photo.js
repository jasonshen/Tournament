import React from 'react'
import { Modal, Button, Image, Card, Header } from 'semantic-ui-react'

class Photo extends React.Component {

  constructor(){
    super()
    this.state = {
      modal: false
    }
  }

  closeModal = () => {
    this.setState({modal: false})
  }
  openModal = () => {
    this.setState({modal: true})
  }

render(){
  return (
    <Card>
      <Image src={this.props.location}  />
      <Card.Content>
        <Card.Header>
          {this.props.closest_match}
        </Card.Header>
        <Card.Description>
          {this.props.closest_match} is the closest match for this photo in the database, with {this.props.percent_match}% accuracy.
        </Card.Description>

        <Modal open={this.state.modal} trigger={<Button onClick={this.openModal} disabled={this.props.disabled}>{this.props.disabled ? this.props.message : "Report this villain!"}</Button>}>
          <Modal.Header>Report {this.props.closest_match}?</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.location} />
            <Modal.Description>
              <Header>Report this villain to headquarters</Header>
              <Button size="massive" onClick={() => {this.closeModal(); this.props.reportPhoto(this.props.location)}}>Report {this.props.closest_match}</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>

    </Card.Content>
    </Card>
  )
}
}

export default Photo
