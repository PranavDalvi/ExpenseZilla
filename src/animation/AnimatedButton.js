import React from 'react'
import { motion } from "framer-motion";

export const AnimatedButton = (props) => {
  return (
    <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    className={props.styleClass}
    onClick={props.click}
    >{props.logo}{props.name}</motion.button>
  )
}
