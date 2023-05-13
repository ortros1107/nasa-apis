import { useContext} from "react";
import {NavContext } from "@/contexts/NavContext";

import isActive from '@/utils/IsActive';

const Navbar = ({ isOpen}) => {

    const {currentPage, pageName} = useContext(NavContext);

  return (
    <nav /*className='navbar'*/ aria-label="Main">
          <ul className='primary-navigation flex' role='list' id="primary-navigation" data-visible={isOpen}>
            <li className={isActive(currentPage.current, "home") ? "active" : ""} onClick={() => {pageName("home");}}>
              <a href="\" className="ff-sans-cond text-dark uppercase letter-spacing-2">Home</a>
            </li>
            <li className={isActive(currentPage.current, "neows") ? "active" : ""} onClick={() => {pageName("neows");}}>
              <a href="Neows" className="ff-sans-cond text-dark uppercase letter-spacing-2">Neows API</a>
            </li>
            <li className={isActive(currentPage.current, "eonet") ? "active" : ""} onClick={() => {pageName("eonet");}}>
              <a href="Eonet" className="ff-sans-cond text-dark uppercase letter-spacing-2">Eonet API</a>
            </li>
          </ul>
        </nav>
  )
}

export default Navbar