import React, { Component } from 'react';

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCL5qglCNPlBHz0SXEB0zGlnBHX5GKJAQw",
    authDomain: "fir-login-757bb.firebaseapp.com",
    databaseURL: "https://fir-login-757bb.firebaseio.com",
    projectId: "fir-login-757bb",
    storageBucket: "fir-login-757bb.appspot.com",
    messagingSenderId: "964248074485"
  };
firebase.initializeApp(config);

class Authen extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise
    .then((usr) => {
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');

      var err = "Thanks for logging in";

      this.setState({err: err});
    }).catch((e) => {
      var err = e.message;

      this.setState({err: err});
    });
  }

  signup(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then((user) => {
      var err = "Welcome "+user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      this.setState({err: err});
    }).catch((e) => {
      var err = e.message;
      this.setState({err: err});
    });
  }

  logout() {
    firebase.auth().signOut();

    var lout = document.getElementById('logout');
    lout.classList.add('hide');

    this.setState({err: 'Goodbye'});
  }

  constructor(props){
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      err: ''
    };
  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your Email" /> <br />
        <input id="pass" ref="password" type="password" placeholder="Enter your Password" /> <br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log Out</button>
      </div>
    );
  }
}

export default Authen;
