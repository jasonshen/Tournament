import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import classes from './Home.scss';
import heroVid from '../../assets/ny_timelapse.webm';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <Aux>
        <div className={classes.HomeContainer}>
          <video loop autoPlay className={classes.HomeVid}>
            <track kind="captions" />
            <source src={heroVid} type="video/webm" />
          </video>
        </div>
        <Container className={classes.blurb}>
          <h2>
            Silent Guardian
          </h2>
          <Divider />
          <p>
            Feel safe with Silent Guardian.  Allows anyone to montior and stop crime as it happens.
            Can be used with mobile devices, webcam, or external camera to help montior the bad guys
            through advance face detection powered by Waynce Corp.
          </p>
        </Container>
      </Aux>
    );
  }
}

export default Home;
