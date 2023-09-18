import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Body from './components/Body';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){
  const [signedIn, setSignedIn] = useState(false)

  onAuthStateChanged(auth, (user) => {
  
    if (user) {
      // User is signed in.
      setSignedIn(true)
      console.log("User is signed in:", user);
  
      // You can access user information like user.uid, user.displayName, etc.
    } else {
      // User is signed out.
      setSignedIn(false)
      console.log("User is signed out");
    }
  });

  return(
    <>
      <React.StrictMode>
    <>
      <Header></Header>
      {signedIn && <Body></Body>}
      {!signedIn && <Login></Login>}
    </>
  </React.StrictMode>
    </>
  )

}

root.render(
<App></App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
