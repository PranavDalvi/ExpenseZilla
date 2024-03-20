import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Ximg from "../../assets/icons/x.svg";
import more from "../../assets/icons/more-fill.svg"
import { AnimatedButton } from "../../animation/AnimatedButton";
import { TransactionOptionsModal } from "../Modals/TransactionOptionsModal";


export const Transaction = ({ transaction }) => {
  
  const [openModal, setOpenModal] = useState(false);

  const sign = transaction.amount < 0 ? "-" : "+";
  const { user } = UserAuth();
  const navigate = useNavigate();
  const userId = user.uid;

  const timestamp = transaction.startDate;
  const date = timestamp.toDate();
  const getDay = date.getDate();
  const getMonth = date.getMonth() + 1;
  const getYear = date.getFullYear();

  return (
    <>
    <li
      className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}
      <span>
        {getMonth}/{getDay}/{getYear}
      </span>
      <span>
        {sign}₹{Math.abs(transaction.amount)}
      </span>
      {/* <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          deleteUser(transaction.id);
        }}
        className="delete-btn"
      >
        <img src={Ximg} height="15px"/>
      </motion.button> */}

      <AnimatedButton styleClass="delete-btn" logo={<img src={more} height="15px"/>} click={() => {setOpenModal(true);}}/>
    </li>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={()=>null}
        >
          {/* Props to close modal */}
        {openModal && <TransactionOptionsModal modalOpen={openModal} closeModal={setOpenModal} transactionId={transaction.id} transactionText={transaction.text} transactionAmt={transaction.amount} transactionMode={transaction.mode} transactionDate={transaction.startDate} />}
        </AnimatePresence>
        </>
  );
};
