import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector(state =>state.auth.status)
    useEffect(() => {
        if (authentication && authstatus !== authentication) {
            navigate("/login")
        }
        else if (!authentication && authstatus !== authentication)
            {
                navigate("/")
            }
        setLoader(false)
    }, [authstatus, navigate, authentication])
    return loader ? <h3>loading....</h3> : <>{children}</>
}
