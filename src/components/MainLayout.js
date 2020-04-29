import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function MainLayout({ children }) {
    const { setUser } = useContext(GlobalContext);
    
    useEffect(() => {
        if(localStorage.getItem('user')||sessionStorage.getItem('user'))
        setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('user')) )
        else {
            setUser({
                transactions: []
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
	return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
}

export default MainLayout;
