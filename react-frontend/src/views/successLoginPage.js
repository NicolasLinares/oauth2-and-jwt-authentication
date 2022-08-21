import React from 'react'
import "./successLoginPage.css"

function SuccessLoginPage(props) {

    setTimeout(() => {
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