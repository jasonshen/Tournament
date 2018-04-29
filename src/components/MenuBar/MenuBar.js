import React, { Component } from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import classes from './MenuBar.scss';
import logo from '../../assets/logo.png';

class MenuBar extends Component {
  state = { activeItem: 'home' };

  componentDidMount() {
    this.checkState();
  }

  checkState() {
    const activeAddress = this.props.history.location.pathname.split('/')[1];
    this.setState({ activeItem: activeAddress });
  }

  handleItemClick = (e, { name }) => {
    this.props.history.push(`/${name}`);
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted color="blue" className={classes.MenuBar}>
        <Container>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name="guardian" active={activeItem === 'guardian'} onClick={this.handleItemClick} />
          <Menu.Item name="images" active={activeItem === 'images'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item header position="right">
              <span className={classes.logo}>
                <Image src={logo} />
              </span>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

MenuBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
  }).isRequired,
};

export default withRouter(MenuBar);
