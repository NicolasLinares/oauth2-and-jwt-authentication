import React, { useEffect, useState } from 'react'
import { LogoutButton } from 'components/buttons'
import { usersController } from 'services/http'
import "./homePage.css"
import { useNavigate } from 'react-router-dom'


function Spinner() {
    return (
        <div className="d-flex flex-column align-items-center">
            <span className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></span>
            Loading...
        </div>
    )
}

function UserInformation ({user}) {
    return (
        <div className='d-flex align-items-center mb-5'>
            <img src={user.picture} className="avatar shadow me-2"/>
            <div className='d-flex flex-column'>
                <strong>{user.fullname || user.loginName}</strong>
                <small>{user.email}</small>
            </div>
        </div>
    )
}

function HomePage({handleLogout}) {

    let [ userInformation, setUserInformation ] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        const jwt = sessionStorage.getItem("jwt")
        let data = sessionStorage.getItem("user")

        setTimeout(() => {
            if (!data) {
                logout()
            }
            setUserInformation(JSON.parse(data))
        }, 1000)
    }, [])

    const logout = () => {
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("user")
        handleLogout()
        navigate("/")
    }

    return (
        
        !userInformation 
            ? <Spinner/>
            : <div className='App-body'>

                <h1 className='mb-5'>Welcome!</h1>

                <UserInformation user={userInformation} />

                <LogoutButton textContent={"Logout"} onClick={logout}/>
            </div>
    )
}


export default HomePage