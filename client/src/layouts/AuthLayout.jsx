import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.isLoggedIn ? true : false);

    useEffect(() => {
      console.log("authStatus: " + authStatus + " required auth " + authentication)
        if(authentication && authentication != authStatus) navigate("/login"); //not authenticated sent to login
        else if(!authentication && authentication != authStatus ) navigate("/"); //authenticated sent to home
        setLoader(false)
    }, [authStatus])

  return (
    !loader ? <>{children}</>:  <h1>loading....</h1> 
  )
}

export default AuthLayout