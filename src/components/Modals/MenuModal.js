import React from "react";
import { motion } from "framer-motion";
import { Backdrop } from "../Backdrop";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Ximg from "../../assets/icons/x.svg";
import { dropIn } from "../../animation/DropIn";
import { AnimatedButton } from "../../animation/AnimatedButton";
import fileText from "../../assets/icons/file-text.svg";
import helpCircle from "../../assets/icons/help-circle.svg";
import logOutImg from "../../assets/icons/log-out.svg";
import dark from "../../assets/icons/moon-line.svg";
import light from "../../assets/icons/sun-line.svg";
import analysisImg from "../../assets/icons/line-chart-line.svg"

export const MenuModal = ({ closeMenu }) => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      closeMenu(false);
      await logOut();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Backdrop onClick={() => closeMenu(false)}>
      <motion.div
        className="modalBody"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        <div className="menu-header">
          <h4>Menu</h4>
          <AnimatedButton name={<img src={Ximg} alt="X" />} styleClass="delete-btn" click={() => closeMenu(false)} />
        </div>

        <div className="profile-section">
          <img
            className="profilePic"
            src={user.photoURL}
            alt={user.displayName}
          />
          <div className="user-details">
            <span className="title">Hello, {user.displayName}</span>
            <span className="subTitle">{user.email}</span>
          </div>
        </div>
        {/* <AnimatedButton logo={<img src={dark} alt="" />} name="Toggle Theme" styleClass="btn btn-theme" /> */}
        {/* <AnimatedButton logo={<img src={fileText} alt="" />} name="User Manual" styleClass="btn btn-um" click={() => window.open("https://github.com/PranavDalvi/Expensezilla/blob/main/README.md", "_blank")} /> */}
        <AnimatedButton logo={<img src={analysisImg} alt="" />} name="Analytics" styleClass="btn " click={() => navigate("/analysis")} />
        <AnimatedButton logo={<img src={helpCircle} alt="" />} name="Support" styleClass="btn btn-help" click={() => window.open("https://gitlab.com/my-web-dev-projects/expensezilla/-/issues","_blank")} />
        <AnimatedButton logo={<img src={logOutImg} alt="" />} name="LogOut" styleClass="btn btn-cancel" click={handleSignOut} />
        <div className="license">
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
      </motion.div>
    </Backdrop>
  );
};
