import React from 'react';
import { useState,useEffect } from 'react';

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {

    const [displayPerScreen,setDisplayPerScreen]=useState(3);
    const [showComplete,setShowComplete]=useState(false);

    function handleShow() {
        if (localStorage.getItem('showCompleted')) { localStorage.removeItem('showCompleted'); }
    
        if (showComplete) {
          setShowComplete(false);
          localStorage.setItem('showCompleted', 'false');
        } else {
          setShowComplete(true);
          localStorage.setItem('showCompleted', 'true');
        }
      }
    
      function handleDisplayPerScreen(e) {
        if (localStorage.getItem('pageNumber')) { localStorage.removeItem('pageNumber'); }
        localStorage.setItem('itemsPerPage', e.target.value);
    
        const itemsPerPage = Number(e.target.value);
        setDisplayPerScreen(itemsPerPage);
      }
    
      useEffect(() => {
        if (localStorage.getItem('itemsPerPage')) {
          const itemsPerPage = Number(localStorage.getItem('itemsPerPage'));
          setDisplayPerScreen(itemsPerPage);
        }
        if (localStorage.getItem('showCompleted')) {
          const showCompleted = Boolean(localStorage.getItem('showCompleted'));
          setShowComplete(showCompleted);
        }
      }, []);

    const state = {
        displayPerScreen,
        showComplete,
        setShowComplete,
        handleDisplayPerScreen,
        handleShow,
    }

    return (
        <SettingsContext.Provider value={{state}}>
            {props.children}
        </SettingsContext.Provider>
    )
}