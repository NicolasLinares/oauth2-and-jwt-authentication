import React, { useState, useEffect } from 'react'
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

    useEffect(() => {
        let id = localStorage.getItem("id")
        if (!id) {
            return
        }
        handleLogin()
        navigate("/home")
    }, [])


    const [messageError, setMessageError] = useState("")

    const startWithGitHub = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GITHUB_LOGIN)
            .then(onSuccessLogin)
            .catch(onFailLogin)
    }

    const startWithGoogle = function (e) {
        e.preventDefault()
        authController.startWithOAuth2(CONST.uri.auth.GOOGLE_LOGIN)
            .then(onSuccessLogin)
            .catch(onFailLogin)
    }

    const startWithEmail = function (credentials) {
        return authController.startWithCredentials(credentials)
            .then(onSuccessLogin)
            .catch(onFailLogin)
    }

    const onSuccessLogin = function ({data}) {
        let { id } = data

        if (!id) {
            let error = "An error occurred during the login process"
            console.log(error)
            setMessageError(error)
            return
        }
        localStorage.setItem("id", id)
        handleLogin()
        navigate("/home")
    }

    const onFailLogin = function (error) {
        if (typeof error !== "object" && !error.response?.data) {
            return
        }
        error = error.response.data.error
        console.log(error)
        setMessageError(error)
    }

    return (
        <section className='login-card'>

            <h2 className='mb-3'>Log in</h2>

            <GoogleOAuth2Button onClick={startWithGoogle} />
            <GitHubOAuth2Button onClick={startWithGitHub} />

            <Separator />

            <CredentialsLoginForm 
                onSubmit={startWithEmail}
                messageError={messageError}
            />
            <LinkButton route={"/register"} previousText="Don´t have an account?" linkText="Sign up"/>
        </section>
    )
}


export default LoginPage