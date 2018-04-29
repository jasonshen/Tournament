import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const { userSignup, login, route } = this.props;
        if (userSignup) {
            userSignup(this.state, route.history);
        } else {
            login(this.state, route.history)
        }
    }

    render() {
        const { username, password } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <div>
                <form onSubmit={(ev) => { handleSubmit(ev) }}>
                    <label htmlFor='username'>Username</label>
                    <input className='form-control' type='text' name='username' value={username} onChange={handleChange} />
                    <label htmlFor='password'>Password</label>
                    <input className='form-control' type='password' name='password' value={password} onChange={handleChange} />
                    {this.props.login ?
                        <button className='button'>Login</button> :
                        <button className='button'>Sign Up</button>
                    }
                </form>
            </div>
        )
    }
}

export default connect(null, null)(SignUp)