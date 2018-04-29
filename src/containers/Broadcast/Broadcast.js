import React, { Component } from 'react';
import { Container, Segment, Button, Grid, Divider, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import createWebRTC from '../../RTCMultiConnection';
import classes from './Broadcast.scss';
import Result from '../../components/Result/Result';

class Broadcast extends Component {
  state = {
    connection: null,
    isLive: false,
    percent_match: null,
    closest_match: null,
    result: null,
    img: null,
  }

  componentDidMount() {
    this.createConnection();
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  createConnection() {
    const connection = createWebRTC();
    // check if user is broadcasting
    this.setState({ connection });
  }

  closeConnection() {
    this.state.connection.attachStreams.forEach((stream) => {
      stream.stop();
    });

    // close live feed for broadcast
    this.state.connection.closeSocket();
    this.setState({ isLive: false });
  }

  startLiveFeed = () => {
    const broadcast = this.state.connection;
    // create token to be used as unique id
    const uniqueId = broadcast.token();
    broadcast.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    this.setState({ isLive: true, connection: broadcast });
    // add unique identifier here to replace broadcast
    broadcast.open(uniqueId);
  }


  takePicture = async () => {
    const imgSrc = this.canvas;
    // dynamically resize canvas element to take picture
    imgSrc.width = this.broadcast.videoWidth;
    imgSrc.height = this.broadcast.videoHeight;
    // capture image
    imgSrc.getContext('2d').drawImage(
      this.broadcast,
      0,
      0,
      imgSrc.width,
      imgSrc.height,
    );

    const imgBase64 = imgSrc.toDataURL();
    const result = await this.sendDataToBeAnalyzed(imgBase64).catch((err) => {
      console.log(err, 'something happened analyzing data by Wayne Corp');
    });

    // save result to server if data is higher than 60%
    // this.saveToServer(result);

    this.setState({
      percent_match: result.percent_match,
      closest_match: result.closest_match,
      picture: result.location,
      result,
    });
  }

  // saveToServer = async (data) => {
  //   // only save result that are higher than 60%
  //   if (data.percent_match >= 60) {
  //     const url = 'https://angular5-91f56.firebaseio.com/data';
  //     await axios.post(url, data);
  //   }
  // }

  sendDataToBeAnalyzed = async (imgBase64) => {
    const url = `https://www.headlightlabs.com/api/gcpd_lookup?api_key=${process.env.REACT_APP_HEADLIGHT_API}`;
    const body = {
      image_contents: imgBase64,
    };
    const response = await axios.post(url, body).catch(err => console.log(err));
    return response.data;
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16}>
              <Segment className={classes.Broadcast} raised>
                <video
                  id="main-broadcast"
                  ref={(c) => { this.broadcast = c; }}
                  track="sdf"
                  muted
                  autoPlay
                >
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
                <canvas
                  className={classes.hidden}
                  ref={(c) => { this.canvas = c; }}
                />
              </Segment>
            </Grid.Column>
            { this.state.result === null ?
              null
              :
              <Segment>
                <Result
                  percent_match={this.state.percent_match}
                  closest_match={this.state.closest_match}
                  location={this.state.picture}
                  result={this.state.result}
                  img={this.state.img}
                />
              </Segment>
            }

            <Divider horizontal>Command Central</Divider>
            <Grid.Column mobile={16}>
              <Segment raised>
                <Container textAlign="center">
                  { this.state.isLive ?
                    <Button
                      onClick={() => this.closeConnection()}
                      color="red"
                    >Stop Guardian
                    </Button>
                    :
                    <Button
                      onClick={() => this.startLiveFeed()}
                      color="green"
                    >Start Guardian
                    </Button>
                  }
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Message className={classes.Action}>
                <Message.Header>
                  Quick Scan
                </Message.Header>
                <Message.Content>
                  Take the live feed screenshot and send to GCPD to analyze!
                </Message.Content>
                <Button
                  onClick={() => this.takePicture()}
                  disabled={!this.state.isLive}
                  color={this.state.isLive ? 'blue' : null}
                >Capture Image
                </Button>
              </Message>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16}>
              <Message className={classes.Action}>
                <Message.Header>
                  Watchful Protector
                </Message.Header>
                <Message.Content>
                  Periodically scan live feed and analyze each screenshot.
                </Message.Content>
                <Button
                  onClick={() => this.takePicture()}
                  disabled={!this.state.isLive}
                  color={this.state.isLive ? 'teal' : null}
                >Activate
                </Button>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


export default withRouter(Broadcast);
