import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseConfig from "./firebaseConfig.json";
import firebase from "firebase/compat";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
