import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import logo from "assets/logo.svg"
import { LoginForm } from 'components/forms'

import "./loginPage.css"

function LoginPage(props) {
    return (
        <div className='App-body'>
            <LoginForm signUpLink=""/>

            <footer className='d-flex align-items-center mt-5'>
                <small>Powered by ReactJS</small>
                <img src={logo} className="App-logo" alt="logo" />
            </footer>
        </div>
    )
}


export default LoginPage