import React, { useState } from "react";
import { motion } from "framer-motion";
import { Backdrop } from "../Backdrop";
import { UserAuth } from "../../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dropIn } from "../../animation/DropIn";
import { AnimatedButton } from "../../animation/AnimatedButton";
import Ximg from "../../assets/icons/x.svg";
import addImg from "../../assets/icons/add-line.svg"

export const AddTransactionModal = ({ closeModal }) => {
  const { user } = UserAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState(null);
  const navigate = useNavigate();
  const userId = user.uid;

  const toExpense = () => {
    if (amount > 0) {
      setAmount(amount * -1);
    }
    setMode("expense");
  }

  const toIncome = () => {
    if (amount < 0) {
      setAmount(amount * -1);
    }
    setMode("income");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let newAmount = parseInt(amount);
    if (user.uid === null || user.uid === undefined) {
      navigate("/");
    } else {
      if (startDate == null || mode == null) {
        alert("Required fields should not be Null");
      } else {
        const month = startDate.getMonth() + 1;
        const year = startDate.getFullYear();
        const index = month + "/" + year
        try {
          const docRef = await addDoc(collection(db, `data/${userId}/transactions`), {
            text,
            amount: newAmount,
            mode,
            startDate,
            index,
            month,
            year,
          });
        } catch (e) {
          alert("Error adding document: ", e);
        }
        closeModal(false);
      }
    }
  };

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
          <h4>Add Transaction</h4>
          <AnimatedButton name={<img src={Ximg} alt="X" />} styleClass="delete-btn" click={() => closeModal(false)} />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="button">Date</label>
            <ReactDatePicker
              closeOnScroll={true}
              showPopperArrow={false}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
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
          <AnimatedButton type="submit" logo={<p className="ez-ui"> ₹ </p>} name="Add Transaction" styleClass="btn" />
        </form>
        <AnimatedButton logo={<img src={Ximg} alt="X" />} name="Cancle" styleClass="btn btn-cancel" click={() => closeModal(false)} />
      </motion.div>
    </Backdrop>
  );
};
