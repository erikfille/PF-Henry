import style from './DarkMode.module.css';
import React, { useState } from 'react';

const DarkMode = () => {

   const [ modo, setModo ] = useState("Modo Oscuro");

   const setDarkMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'dark')
      localStorage.setItem("selectedTheme", "dark")
   }

   const setLightMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'light')
      localStorage.setItem("selectedTheme", "light")
   }

   const selectedTheme = localStorage.getItem("selectedTheme");

   if(selectedTheme === "dark"){
      setDarkMode();
   }

   const toggleTheme = (e) => {
      if(e.target.checked) setDarkMode();
      else setLightMode();
      modo === "Modo Claro"
      ? setModo("Modo Oscuro")
      : setModo ("Modo Claro")
   }


   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col d-flex flex-column p-0 m-0 align-items-center">
                  <p className={`${style.fColor} mb-0`}>{modo}</p>
                  <div className={`${style.darkMode} form-check form-switch m-0 p-0`}>
                     <input onChange={(e) => toggleTheme(e)} defaultChecked={selectedTheme === "dark"} className={`${style.darkModeInput} form-check-input`} type="checkbox" id="darkmode" />
                     <label className={`${style.darkModeLabel} form-check-label`} htmlFor="darkmode"></label>
                  </div>   
               </div>
            </div>
         </div>
      </>
   )
}

export default DarkMode;