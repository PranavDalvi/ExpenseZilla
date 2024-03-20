import React, { useState } from "react";
import { motion } from "framer-motion";
import { Backdrop } from "../Backdrop";
import { db } from "../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Ximg from "../../assets/icons/x.svg";
import deleteImg from "../../assets/icons/delete-bin-line.svg"
import editImg from "../../assets/icons/edit-line.svg"
import { dropIn } from "../../animation/DropIn";
import { AnimatedButton } from "../../animation/AnimatedButton";
import ReactDatePicker from "react-datepicker";

export const TransactionOptionsModal = ({ closeModal, transactionId, transactionText, transactionAmt, transactionMode, transactionDate }) => {

  const [editTrans, setEditTrans] = useState(false);
  const [text, setText] = useState(transactionText);
  const [amount, setAmount] = useState(transactionAmt);
  const [mode, setMode] = useState(transactionMode);
  
  const { user } = UserAuth();
  const navigate = useNavigate();
  const userId = user.uid;
  const transactionData = doc(db, `data/${userId}/transactions`, transactionId);

  const toExpense = () => {
    if(amount > 0){
      setAmount(amount * -1);
    }
    setMode("expense");
  }

  const toIncome = () => {
    if(amount < 0){
      setAmount( amount * -1);
    }
    setMode("income");
  }
  
  const deleteUser = async () => {
    if (user.uid === null || user.uid === undefined) {
      navigate("/");
    } else {
      closeModal(false)
      await deleteDoc(transactionData);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let newAmount = parseInt(amount);
    if (user.uid === null || user.uid === undefined) {
      navigate("/");
    } else {
        try {
          updateDoc(transactionData, {
            text,
            amount: newAmount,
            mode,
          })
        } catch (e) {
          alert("Error adding document: ", e);
        }
        closeModal(false);
    }

  };
  if (editTrans === false) {
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
            <h4>Transaction Options</h4>
            <AnimatedButton name={<img src={Ximg} alt="X" />} styleClass="delete-btn" click={() => closeModal(false)} />
          </div>
          <span className="subTitle">For {transactionText === '' ? transactionId : transactionText}</span>
          <div>
            <AnimatedButton logo={<img src={deleteImg} alt="D" />} name="Delete Transaction" styleClass="btn btn-cancel" click={() => deleteUser()} />
            <AnimatedButton logo={<img src={editImg} alt="E" />} name="Modify Transaction" styleClass="btn" click={() => { setEditTrans(true) }} />
          </div>
        </motion.div>
      </Backdrop>
    )
  }
  if (editTrans === true) {
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
            <h4>Modify Transaction</h4>
            <AnimatedButton name={<img src={Ximg} alt="X" />} styleClass="delete-btn" click={() => closeModal(false)} />
          </div>
          <span className="subTitle">For {transactionText === '' ? transactionId : transactionText}</span>
          <div>
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <label htmlFor="text">Text</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text...."
                />
              </div>
              <div className="form-control">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount.... eg. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="form-control inc-exp-container">
                <div>
                  <input
                    type="radio"
                    onChange={() => {
                      toExpense();
                    }}
                    value="expense"
                    checked={mode === "expense"}
                    name="mode"
                  />
                  <span>Expense</span>
                </div>
                <div>
                  <input
                    type="radio"
                    onChange={() => {
                      toIncome();
                    }}
                    value="income"
                    checked={mode === "income"}
                    name="mode"
                  />
                  <span>Income</span>
                </div>
              </div>
              <AnimatedButton type="submit" logo={<img src={editImg} alt="E" />} name="Modify Transaction" styleClass="btn" />
            </form>
            <AnimatedButton logo={<img src={Ximg} alt="X" />} name="Cancle" styleClass="btn btn-cancel" click={() => closeModal(false)} />
          </div>
        </motion.div>
      </Backdrop>
    )
  }
}
