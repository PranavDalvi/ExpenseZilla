import React, { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuIcon from "../assets/icons/menu.svg";
import { MenuModal } from "./Modals/MenuModal";
import { AnimatedButton } from "../animation/AnimatedButton";
import "../App.css";
import ezLogo from "../assets/logos/logo192.png"

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="header">
      <div>
      <h2> Expensezilla ( β )</h2>
      </div>
      <div>
      <AnimatedButton name={<img src={MenuIcon} alt="Menu" />} styleClass="btn-menu" click={() => {setOpenMenu(true);}}/>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={()=>null}
        >
          {/* Props to close modal */}
          {openMenu && <MenuModal closeMenu={setOpenMenu} />}
        </AnimatePresence>
        </div>
    </div>
  );
};
