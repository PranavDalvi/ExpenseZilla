import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import GLogo from "../assets/logos/g-logo.png";
import { LoadingScreen } from "../components/LoadingScreen";
import appOverview from "../assets/images/app-overview.png";
import devices from "../assets/images/device.png";
import built from "../assets/images/built-with.png";
import { AnimatedButton } from "../animation/AnimatedButton";
import fileText from "../assets/icons/file-text.svg"
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("User-Token");

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setLoading(true);
    } catch (error) {
      alert(error);
    }
  };

  if (loading === true || isLoggedIn != undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <div className="container">
          <div className="header">
            <h2>Expensezilla ( βeta )</h2>
          </div>
          <div>
            <h2>Manage your expenses on the go!</h2>
            <p>
              Add your expenses, incomes easily from anywhere or from any device
              just using your Google Account.
              {/* Client-side (front-end) is fully open-source. */}
            </p>

            <AnimatedButton logo={<img src={GLogo} alt="G" />} name="Sign In With Google" styleClass="signIn" click={handleGoogleSignIn} />
            {/* <AnimatedButton logo={<img src={fileText} alt="" />} name="User Manual" styleClass="btn-small btn-um" click={() => window.open("https://github.com/PranavDalvi/Expensezilla/blob/main/README.md", "_blank")} /> */}

            <img
              className="img-border"
              src={appOverview}
              alt="overview-img"
              height={300}
              width={350}
            />
            <h2>Fast, Secure, & Light Weight!</h2>
            <p>
              No need to carry those bulky note books or download bulky apps
              that eats appx. +200MB of your mobile storage.
            </p>
            <img
              className="img-border"
              src={devices}
              alt="devices"
              height={300}
              width={350}
            />
            <h2>Can run on any devices!</h2>
            <p>
              This app can run on any devices. Providing Seamless experience.
              Thanks to real-time database no need to refresh app to get latest
              data.
            </p>
            <img
              className="img-border"
              src={built}
              alt="Technologies used"
              height={300}
              width={350}
            />
            <h2>Technologies used:</h2>
            <p>
              This Project was possible because of following libraries:
            </p>
            <p>Firebase, Framer Motion, React, React-CSV, React Datepicker, React Router Dom</p>
            <a href="https://storyset.com/web">Web illustrations by Storyset</a>
          </div>
          <div className="license">
            <AnimatedButton logo={<img src={GLogo} alt="G" />} name="Sign In With Google" styleClass="signIn" click={handleGoogleSignIn} />
            <span>Made with &#10084; by Pranav Dalvi</span>
            <br />
            {/* <a
              href="https://github.com/PranavDalvi/expense-tracker-reactjs/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                expense-tracker-reactjs is licensed under the MIT License{" "}
              </span>
            </a> */}
          </div>
        </div>
      </>
    );
  }
}
