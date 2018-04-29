import React from 'react';
import image from '../wayne_enterprise_logo.png';

const Header = ({ title }) => {
    return (
        <header className="App-header">
            {/* <h1 className="App-title">{title}</h1> */}
            <img src={image} alt="Wayne Enterprises" />
        </header>
    );
};

export default Header;
