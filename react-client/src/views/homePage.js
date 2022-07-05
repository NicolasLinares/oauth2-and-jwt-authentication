import React, { useEffect, useState } from 'react'
import { LogoutButton } from 'components/buttons'
import { usersController } from 'services/http'
import "./homePage.css"


function Spinner() {
    return (
        <div className="d-flex flex-column align-items-center">
            <span className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></span>
            Loading...
        </div>
    )
}

function HomePage() {

    let [ userInformation, setUserInformation ] = useState(null)

    useEffect(() => {
        const jwt = sessionStorage.getItem("jwt")
        let data = sessionStorage.getItem("user")

        setTimeout(() => {
            setUserInformation(JSON.parse(data))
        }, 1000)
    }, [])

    return !userInformation 
        ?
        <Spinner/>
        :
        <div className='App-body'>
            <img src={userInformation.picture} className="avatar shadow mb-5"/>
            <h2>
                Welcome {userInformation.loginName}!
            </h2>

            <LogoutButton textContent={"Logout"}/>
        </div>
}


export default HomePage