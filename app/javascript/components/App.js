import React from "react"

import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types"
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import * as styles from './AppComponents/Home.style'
import FlagSearch from "./AppComponents/FlagSearch";
import FlagDetails from "./FlagDetails";
import Flag from "./Flag";
import NoMatch from './NoMatch'
import Maps from './Maps'


import Home from './AppComponents/Home'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: "",
        password: ""
      },
      name: "",
      location: "",
      licensePlateNumber: "",
      phoneNumber: ""
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

  ///users/sign_up

  handleEmailChange = event => {
    const { user } = this.state;
    user.email = event.target.value;
    this.setState({ user: user });
  };

  handlePasswordChange = event => {
    const { user } = this.state;
    user.password = event.target.value;
    this.setState({ user: user });
  };

  handleContactChange = event => {
    const { user } = this.state;
    user.contact = event.target.value;
    this.setState({ user: user });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = () => {
    const { name, location, licensePlateNumber, phoneNumber } = this.state
    const params = { name, location, licensePlateNumber, phoneNumber}
    return fetch("/flags/search", {
            body: JSON.stringify(params),
            headers: {'Content-Type': 'application/json'},
            method: "GET"
        }).then(response => {
                return response.json();
            })
            .then(flags => {
                const newState = {searchedFlags: flags};
                if (flags.length === 0){
                    newState.view = 'noMatch'
                } else {
                    newState.view = 'match'
                }
                this.setState(newState);
            })
  }

  render () {
    const { logged_in, sign_in_route, sign_out_route, sign_up_route} = this.props

    return (
      <React.Fragment>
        {logged_in &&
          <div>
            <Router>
              <div className="row" style={styles.HEADER}>
                  <div className="col-sm-2 col-sm-offset-6">
                      <div>My Account</div>
                  </div>
                  <div className="col-sm-2">
                      <a href={sign_out_route} style={{color: 'white'}}>Sign Out</a>
                  </div>
              </div>
              <div className="row" style={{boxSizing: 'content-box'}}>
                  <div className="col-sm-3">
                      <div className="row">
                        <Link to="/">
                          <Button block>Home</Button>
                        </Link>
                      </div>
                      <div className="row">
                        <Link to="/log">
                          <Button block>Log Incident</Button>
                        </Link>
                      </div>
                      <div className="row">
                        <a href={sign_out_route}>
                          <Button block>Sign Out</Button>
                        </a>
                      </div>
                  </div>

                  <div className="col-sm-7">
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/log" render={(props) => 
                        <FlagSearch onChange={this.handleChange} onSearch={this.handleSearch}/>} 
                      />
                    </Switch>
                  </div>
              </div>
            </Router>
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
            
            <a href={sign_up_route}>Sign Up</a>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default App
