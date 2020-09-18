import React, { useContext, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);

        console.log(displayName, email, photoURL);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('Fb user after login', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);

    let isFieldValid = true;
    if(e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
    }
    if(e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      // console.log(isPasswordValid && passwordHasNumber);
    }

    if(isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info', response.user);
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault();
  }

  const updateUserName = name => {
    var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name
}).then(function() {
  console.log('user name updated successfully');
}).catch(function(error) {
  console.log(error);
});
  }

  return (
    <div style={{textAlign: 'center'}}>
      {/* {
        user.isSignedIn 
        ? <button onClick={handleSignOut}>Sign out</button>
        : <button onClick={handleSignIn}>Sign in</button>
      } */}
      
      {/* <button onClick={handleFbSignIn}>Login with Facebook</button> */}

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name} !</p>
          <p>Your email is: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      )}
      {/* <p>Name: {user.name}</p>
      <p>Email is: {user.email}</p>
      <p>Password is: {user.password}</p> */}
      {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label> */}
      <form onSubmit={handleSubmit} action="">
        {newUser && <input type="text" style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'whiteSmoke'}} placeholder="First Name" onBlur={handleChange} required name="name"/>}
        <br/>
        {newUser && <input type="text" style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'whiteSmoke'}} placeholder="Last Name" onBlur={handleChange} required name="name"/>}
        <br/>
        <input style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'whiteSmoke'}} type="text" placeholder="User Name or Email" onBlur={handleChange} required name="email" id=""/>
        <br/>
        <input style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'whiteSmoke'}} type="password" placeholder="Password" onBlur={handleChange} required name="password" id=""/>
        <br/>
        {newUser && <input type="password" style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'whiteSmoke'}} placeholder="Confirm Password" onBlur={handleChange} required name="name"/>}
        <br/>
        <input style={{padding:'10px 10px', width:'300px', border:'none', marginBottom:'20px', backgroundColor:'goldenRod'}} type="submit" value={newUser ? 'Create an Account' : 'Login'}/>
        <br/>
        
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">Create an Account Here</label>
      </form>

    <p style={{color:'red'}}>{user.error}</p>
    {
      user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged in'} successfully!</p>
    }

<button style={{width:'300px', height:'40px', backgroundColor:'blue', color:'white',fontSize:'20px', border:'none', borderRadius:'15px'}} onClick={handleFbSignIn}>Continue with Facebook</button>

<br/>
<br/>
{
        user.isSignedIn 
        ? <button onClick={handleSignOut}>Sign out</button>
        : <button style={{width:'300px', height:'40px', backgroundColor:'blue', color:'white',fontSize:'20px', border:'none', borderRadius:'15px'}} onClick={handleSignIn}>Continue with Google</button>
      }


    </div>
  );
}

export default Login;
