import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { Chart } from "react-google-charts";
import { LoadingScreen } from '../components/LoadingScreen';
import { Header } from '../components/Header';

export const Analysis = () => {
  const { user } = UserAuth();
  const userId = user.uid;

  const data = [
    ["Month", "Incomes", "Expenses"],
  ];

  const [filter, setFilter] = useState("monthly");
  const [transactions, setTransactions] = useState([]);
  // const [income, setIncome] = useState(null);
  // const [expense, setExpense] = useState(null);
  // const [month, setMonth] = useState(null);
  const [chartData, setChartData] = useState([["Month", "Incomes", "Expenses"]]);

  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const month = transactions.map((transaction) => transaction.month);
  const year = transactions.map((transaction) => transaction.year);
  const count = 1;
  let tranObjLength = Object.keys(transactions).length;

  useEffect(() => {
    if (isNaN(parseInt(month))) {
      console.log("wait")
    }
    else if (tranObjLength != 0) {
      console.log(tranObjLength)
      const tran = [parseInt(month), parseInt(income), parseInt(expense)]
      // data.push(tran)

      setChartData((prevState) => ([
        ...prevState,
        tran
      ]))

      console.log(chartData)
      tranObjLength = tranObjLength - 1;
    }
    // return () => {
    //   second
    // }
  }, [tranObjLength])

  const collectionRef = collection(db, `data/${userId}/transactions`);
  const q = query(collectionRef, orderBy("startDate", "desc"));
  const docData = onSnapshot(q, (snapshot) => {
    setTransactions(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  });

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const chartOptions = {
    title: `Showing Data on ${filter} basis`,
    hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };

  return (
    <>
    <Header/>
      <div className="date-header">
        <h3>Transaction Analysis Page</h3>
      </div>
      <div>
        <p><b> &#9888;&#65039; Note: This Page is still in development.</b></p>
      </div>
      <div className='container'>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </>
  )
}
