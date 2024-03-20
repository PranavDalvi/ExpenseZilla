import React, { forwardRef, useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import ReactDatePicker from "react-datepicker";
import calendarIcon from "../assets/icons/calendar.svg"
import {motion} from "framer-motion"

export const MonthPicker = () => {
  const { selectedMonth, selectedYear } = useContext(TransactionContext);
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="month-mobile-btn" onClick={onClick} ref={ref}>
      <img src={calendarIcon} />
    </motion.button>
  ));

  useEffect(() => {
    selectedMonth(startDate.getMonth() + 1);
    selectedYear(startDate.getFullYear());
  }, [startDate])

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showPopperArrow={false}
      customInput={<ExampleCustomInput />}
    />
  );
}
