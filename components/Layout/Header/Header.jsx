import Image from 'next/image';
import Navbar from "./Navbar/Navbar"
import styles from "@/styles/Header.module.css";
import { useState } from "react";

const Header = () => {

  const [open, isOpen] = useState(false);

  const navToggle = (e) => {
    if (!open) {
      e.target.children[0].setAttribute("aria-expanded", true);
      e.target.style.backgroundImage = `url("/icon-close.svg")`;
      isOpen(!open);
    } else {
      e.target.children[0].setAttribute("aria-expanded", false);
      e.target.style.backgroundImage = `url("/icon-hamburger.svg")`;
      isOpen(!open);
    }
    console.log(e.target.children[0].getAttribute("aria-expanded"));
  };

  return (
    <header className="primary-header flex">
      <div className={`logo ${styles.logo}`}>
        <Image 
        src={"nasa-6.svg"} 
        width={50} 
        height={50} 
        alt='nasa-logo' 
        priority>
          </Image>
          </div>
      <button
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
        onClick={navToggle}
      >
        <span className="sr-only" aria-expanded="false">
          Menu
        </span>
      </button>
        <Navbar isOpen={open}/>
    </header>
  )
}

export default Header