import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types"
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: "",
        password: ""
      }
    }
  }

  handleUserLogin = (user) => {
    return fetch("/users/sign_in", {
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
      method: "POST"
    }).then((resp)=>{
      if (resp.redirected === true){
        window.location.replace("/");
      } else {
        alert("Sign in information incorrect")
      }
    })
  }

  handleEmailChange = event => {
    const { user } = this.state;
    // console.log(user.email)
    user.email = event.target.value;
    this.setState({ user: user });
  };

  handlePasswordChange = event => {
    const { user } = this.state;
    // console.log(user.password)
    user.password = event.target.value;
    this.setState({ user: user });
  };

  render () {
    const { logged_in, sign_in_route, sign_out_route, sign_up_route} = this.props

    return (
      <React.Fragment>
        {logged_in &&
          <div>
            <a href={sign_out_route}>Sign Out</a>
          </div>
        }
        {!logged_in &&
          <div>
            <Form inverted>
              <Form.Field required={true} onChange={this.handleEmailChange}>
                <label>E-Mail Address</label>
                <input placeholder='Enter Your E-Mail Address' />
              </Form.Field>
              <Form.Field required={true} onChange={this.handlePasswordChange}>
                <label>Password</label>
                <input type='password' placeholder='Enter Your Password' />
              </Form.Field>
              <Button basic color='blue' onClick={() => this.handleUserLogin(this.state)}>
                Log-In
              </Button>
            </Form>
            
            <a href={sign_in_route}>Sign In</a>
            <a href={sign_up_route}>Sign Up</a>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default App
