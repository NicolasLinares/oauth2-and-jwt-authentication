import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'


import "./successLoginPage.css"

function SuccessLoginPage(props) {

    let timer = setTimeout(() => {
        window.close()
    }, 2000)

    return (
        <div className='App-body'>
            <h2>Successful login!</h2>
            <small>Redirecting to home page...</small>
        </div>
    )
}


export default SuccessLoginPage