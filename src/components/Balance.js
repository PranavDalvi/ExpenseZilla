import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import calendarIcon from "../assets/icons/calendarBlack.svg"

export const Balance = () => {
  const {transactions, month, year} = useContext(TransactionContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <>
      <h4>Your Balance for <img src={calendarIcon} height="15px"/> {month} / {year}</h4>
      <h1>₹{total}</h1>
    </>
  );
};
