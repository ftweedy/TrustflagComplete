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
        email: "tweedyfrancis@gmail.com",
        password: "testing"
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

  // handleEmailChange = event => {
  //   const { user } = this.state;
  //   user.email = event.target.value;
  //   this.setState({ user: user });
  // };

  // handlePasswordChange = event => {
  //   const { user } = this.state;
  //   user.password = event.target.value;
  //   this.setState({ user: user });
  // };

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
            <Button basic color='blue' onClick={() => this.handleUserLogin(this.state)}>
              Log-In
            </Button>
            <a href={sign_in_route}>Sign In</a>
            <a href={sign_up_route}>Sign Up</a>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default App
