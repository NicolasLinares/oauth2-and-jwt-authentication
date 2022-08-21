import React from 'react'

import "./failureLoginPage.css"

function FailureLoginPage(props) {

    setTimeout(() => {
        window.close()
    }, 2000)

    return (
        <div className='App-body'>
            <h2>Impossible to connect!</h2>
            <small>Redirecting to login page...</small>
        </div>
    )
}


export default FailureLoginPage