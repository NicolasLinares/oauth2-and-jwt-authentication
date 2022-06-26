import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { CONST } from "config"
import { authController, usersController } from "services/http"
import CredentialsLoginForm from "./loginForm"
import "./loginOptionsCard.css"
import { GoogleOAuth2Button, GitHubOAuth2Button } from 'components/buttons'


function Separator () {
    return (
        <div className='or-container my-4'>
            <p className='or-divider'>
                or
            </p>
        </div>
    )
}


function LoginOptionsCard(props) {
    
    const startWithGitHub = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GITHUB_LOGIN, usersController.fetchUser)
    }

    const startWithGoogle = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GOOGLE_LOGIN, usersController.fetchUser)
    }

    const startWithEmail = function (credentials) {
        return authController.startWithCredentials(credentials)
    }

    const onFailLogin = function (error) {
        console.error(error)
    }

    const onSuccessLogin = function (data) {
        console.log(data)
    }

    return (
        <section className='login-card'>

            <h2 className='mb-3'>Log in</h2>

            <GoogleOAuth2Button onClick={startWithGoogle} />
            <GitHubOAuth2Button onClick={startWithGitHub} />

            <Separator />

            <CredentialsLoginForm 
                onSubmit={startWithEmail} 
                onFailLogin={onFailLogin} 
                onSuccessLogin={onSuccessLogin}
            />

        </section>
    )
}


export default LoginOptionsCard
