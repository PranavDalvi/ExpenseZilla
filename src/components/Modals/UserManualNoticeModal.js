import React from 'react'
import { motion } from "framer-motion";
import { Backdrop } from "../Backdrop";
import { UserAuth } from "../../context/AuthContext";

import Ximg from "../../assets/icons/x.svg";
import { dropIn } from "../../animation/DropIn";
import { AnimatedButton } from "../../animation/AnimatedButton";
import fileText from "../../assets/icons/file-text.svg";

export const UserManualNoticeModal = ({closeModal}) => {
    const { user } = UserAuth();
  return (
    <Backdrop onClick={() => closeModal(false)}>
      <motion.div
        className="modalBody"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        <div className="menu-header">
          <h4>Notice</h4>
          <AnimatedButton name={<img src={Ximg} alt="X" />} styleClass="delete-btn" click={() => closeModal(false)} />
        </div>
        <br/>
        <div>
            <h3>Hey there {user.displayName}!</h3>
            <br/>
            <p>Welcome back I hope you love using Expensezilla</p>
        </div>
        </motion.div>
    </Backdrop>
  )
}
