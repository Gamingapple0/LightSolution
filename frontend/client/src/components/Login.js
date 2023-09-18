import React, { Component } from 'react'
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import "./Login.css"
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';




export default function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signin = async (e) => {
      e.preventDefault(); // Prevent the form from submitting
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // If sign-in is successful, you can redirect or handle it accordingly
      } catch (error) {
        // Handle any sign-in errors here
        console.error('Sign-in error:', error.message);
      }
    };
  

    return(
        <>
         return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 style={{color:"white"}} className="mt-1 mb-5 pb-1">DevLinks Light Manager</h4>
            </div>

            <p>Please login to your account</p>


            <form onSubmit={signin}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">
                  Sign in
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </form>
            </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
        </>
    )
}