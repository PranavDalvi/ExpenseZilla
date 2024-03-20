// This Context makes sure that data from Database is fetched and send to every other component in this webApp.
import React, { useState, createContext, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

// Create Context
export const TransactionContext = createContext();

export const TransactionProvider = ({children}) => {
  const { user } = UserAuth();
  const [year, setYear] = useState(0)
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(0)
  const navigate = useNavigate();
  const userId = user.uid;
  const index = month+"/"+year

  useEffect(() => {
    if (user.uid === null || user.uid === undefined) {
      navigate("/");
    } else {
      const collectionRef = collection(db, `data/${userId}/transactions`);
      const q = query(collectionRef, orderBy("startDate", "desc"), where("index", "==", index));
      const data = onSnapshot(q, (snapshot) => {
        setTransactions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return data;
    }
  }, [month, year]);

  function selectedMonth(month) {
    setMonth(month)
  }

  const selectedYear = (year) => {
    setYear(year);
  }

  return (
    <TransactionContext.Provider value={{transactions,month, year, setTransactions, selectedMonth, selectedYear}}>
      {children}
    </TransactionContext.Provider>
  );
};
