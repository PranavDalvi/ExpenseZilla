import React from "react";
import logo from "../assets/logos/logo.svg";

export const LoadingScreen = () => {
  try {
    return(
    <div className="App-logo-div"><img src={logo} className="App-logo" alt="logo" /></div>
    )
  } catch (e) {
    alert("loading screen error:", e);
  }
};
