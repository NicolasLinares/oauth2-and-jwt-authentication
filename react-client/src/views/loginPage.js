import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import logo from "assets/logo.svg"
import { LoginOptionsCard } from 'components/forms'

import "./loginPage.css"

function RegisterLink ({signUpLink}) {
    return (
        <p className='mt-4'>
            Don´t have an account?
            <a href={signUpLink} className='mx-2'>Sign up</a>
        </p>
    )
}

function Footer() {
    return (
        <footer className='d-flex align-items-center mt-5'>
            <small>Powered by ReactJS</small>
            <img src={logo} className="App-logo" alt="logo" />
        </footer>
    )
}


function LoginPage(props) {
    return (
        <div className='App-body'>

            <LoginOptionsCard />
            <RegisterLink signUpLink="/register"/>
            <Footer />
        </div>
    )
}


export default LoginPage