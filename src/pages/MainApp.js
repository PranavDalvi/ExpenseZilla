// Package import
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// CSS import
import "../App.css";

// User defined Components import
import { Header } from "../components/Header";
import { Balance } from "../components/Balance";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { TransactionList } from "../components/Transactions/TransactionList";
import { AddTransactionModal } from "../components/Modals/AddTransactionModal";
import { MonthPicker } from "../components/MonthPicker";

// User defined Context import
import { TransactionProvider } from "../context/TransactionContext";
import plus from "../assets/icons/plus.svg"
import ezLogo from "../assets/logos/logo192.png"
import { AnimatedButton } from "../animation/AnimatedButton";

import { motion } from "framer-motion";
import { PageExpandAnimation } from "../animation/PageExpand";
import { UserManualNoticeModal } from "../components/Modals/UserManualNoticeModal";
function MainApp() {

  // UseState to hide and show add transaction modal
  const [openModal, setOpenModal] = useState(false);
  const [umNotice, setUmNotice] = useState(false);

  useEffect(()=>{
    const firstTime = localStorage.getItem("firstTime");
    if(firstTime !== "false"){
      setUmNotice(true);
      localStorage.setItem("firstTime", "false")
    }
  },[])

  return (
    <TransactionProvider>
      <motion.div
      variants={PageExpandAnimation} // Defined animation states
      whileHover="hover" // Animation on hover gesture
      initial="initial" // Starting animation
      animate="animate" // Values to animate to
      exit="exit"
      className="container">
      <Header />
        <Balance />
        <IncomeExpenses />
        <div className="header-with-link">
        <h3>Transactions</h3>
        <span><Link to="/history">View all</Link></span>
      </div>
      <div className="scroll-view">
        <TransactionList />
        </div>
        {/* Button code to open add transaction model */}
        <div className="Bottom-menu">
          <AnimatedButton logo={<p className="ez-logo">₹</p>} styleClass="add-tran-mobile-btn" click={() => {setOpenModal(true);}} />
        <MonthPicker/>
        </div>

        {/* Prevents cutting/hidding div before completing animation */}
        <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={()=>null}
        >
          {/* Props to close modal */}
        {openModal && <AddTransactionModal modalOpen={openModal} closeModal={setOpenModal} />}
        {umNotice && <UserManualNoticeModal modalOpen={umNotice} closeModal={setUmNotice} />}
        </AnimatePresence>
        
      </motion.div>
    </TransactionProvider>
  );
}

export default MainApp;
