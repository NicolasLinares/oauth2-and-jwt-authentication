import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { CONST } from "config"
import { authController } from "services/http"
import { CredentialsLoginForm } from "components/forms"
import { GoogleOAuth2Button, GitHubOAuth2Button, LinkButton } from 'components/buttons'
import { useNavigate } from 'react-router-dom'

function Separator () {
    return (
        <div className='or-container my-4'>
            <p className='or-divider'>
                or
            </p>
        </div>
    )
}


function LoginPage({handleLogin}) {

    let navigate = useNavigate()


    const startWithGitHub = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GITHUB_LOGIN)
            .then((data) => {
                onSuccessLogin(data)
            })
    }

    const startWithGoogle = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GOOGLE_LOGIN)
            .then((data) => {
                onSuccessLogin(data)
            })
    }

    const startWithEmail = function (credentials) {
        return authController.startWithCredentials(credentials)
    }

    const onSuccessLogin = function (data) {
        let { jwt, user } = data
        console.log(jwt)
        console.log(JSON.stringify(user))

        sessionStorage.setItem("jwt", jwt)
        sessionStorage.setItem("user", JSON.stringify(user))

        handleLogin()
        navigate("/home")
    }

    return (
        <section className='login-card'>

            <h2 className='mb-3'>Log in</h2>

            <GoogleOAuth2Button onClick={startWithGoogle} />
            <GitHubOAuth2Button onClick={startWithGitHub} />

            <Separator />

            <CredentialsLoginForm 
                onSubmit={startWithEmail}
                onSuccessLogin={onSuccessLogin}
            />
            <LinkButton route={"/register"} previousText="Don´t have an account?" linkText="Sign up"/>
        </section>
    )
}


export default LoginPage