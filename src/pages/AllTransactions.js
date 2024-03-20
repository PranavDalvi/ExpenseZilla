import React, { useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

import "../App.css"
import { Transaction } from '../components/Transactions/Transaction'
import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { PageExpandAnimation } from "../animation/PageExpand";
import { AnimatedButton } from "../animation/AnimatedButton";
import fileDownload from "../assets/icons/file-excel.svg";
import { CSVLink } from "react-csv";


export const History = () => {
  const { user } = UserAuth();
  const [transactions, setTransactions] = useState([]);
  const userId = user.uid;
  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  if (user.uid === null || user.uid === undefined) {
    return (<LoadingScreen />)
  } else {
    const collectionRef = collection(db, `data/${userId}/transactions`);
    const q = query(collectionRef, orderBy("startDate", "desc"));
    const data = onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    const headers = [`Date`, `Text`, `Mode`, `Amount`];
    const dataToCSV = transactions.map((transaction) => [transaction.startDate.toDate(), transaction.text, transaction.mode, transaction.amount])

    return (
      <motion.div
        variants={PageExpandAnimation} // Defined animation states
        whileHover="hover" // Animation on hover gesture
        initial="initial" // Starting animation
        animate="animate" // Values to animate to
        exit="exit"
        className="container">
          <Header/>
        <div className="date-header">
          <h3>All Transactions</h3>
          <CSVLink className="btn-small btn-ete" data={dataToCSV} headers={headers} filename={`Expensezilla-export.csv`}> <img src={fileDownload} alt="" /> Export to CSV</CSVLink>
        </div>
        <div className="inc-exp-container">
          <div>
            <h4>Total Income</h4>
            <p className="money plus">+₹{income}</p>
          </div>
          <div>
            <h4>Total Expense</h4>
            <p className="money minus">-₹{expense}</p>
          </div>
        </div>
        <ul className="list">
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      </motion.div>
    )
  }
}
