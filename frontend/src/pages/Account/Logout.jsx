import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalVariableContext } from '../../App'
// import { GlobalVariableContext } from '../App'

const Logout = () => {
    let navigate = useNavigate()

    let global = useContext(GlobalVariableContext)
    useEffect(() => {
        localStorage.removeItem("token")
        global.setToken(null)
        navigate("/")

    }, [])
    return (
        <div>Logging out...</div>
    )
}

export default Logout