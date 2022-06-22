import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import "./loginForm.css"
import { CONST } from "config"
import { authController, usersController } from "services/http"

import { useForm } from "react-hook-form"

const BootstrapStyle = {
    button: 'mt-3 p-3 w-100 d-flex justify-content-center align-items-center',
    inputError: 'input-error',
    messageError: 'message-error'
}

function CredentialsLoginForm ({onSubmit, onFailLogin, onSuccessLogin}) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [passwordButtonVisibility, setPasswordButtonVisibility] = useState(false)
    const [passwordValueVisibility, setPasswordValueVisibility] = useState(false)


    const showInputBorderFeedback = function(containerId, inputId) {
        let inputContainer = document.getElementById(containerId)
        inputContainer.classList.add(BootstrapStyle.inputError)
        let inputElement = document.getElementById(inputId)
        inputElement.onfocus = () => {
            inputContainer.classList.remove(BootstrapStyle.inputError)
        }
    }
    const hideErrorMessageFeedback = function() {
        let errorMessage = document.getElementById("message-error")
        errorMessage.hidden = true
        errorMessage.innerText = ""
    }
    const showErrorMessageFeedback = function(message) {
        let errorMessage = document.getElementById("message-error")
        errorMessage.hidden = false
        errorMessage.innerText = "Incorrect email or password"
    }
    const showErrorByStatus = []
    showErrorByStatus[CONST.httpStatus.NOT_FOUND] = function () {
        showInputBorderFeedback("input-email-container", "input-email")
    }
    showErrorByStatus[CONST.httpStatus.UNAUTHORIZED] = function () {
        showInputBorderFeedback("input-password-container", "input-password")
    }

    const handleFailLogin = function ({status, data}) {
        console.error(data.error)
        showErrorMessageFeedback(data.error)
        //showErrorByStatus[status]()
        typeof(onFailLogin) == "function" && onFailLogin()
    }
    const handleSuccessLogin = function ({data}) {
        console.log(data)
        hideErrorMessageFeedback()
        typeof(onSuccessLogin) == "function" && onSuccessLogin()
    }

    const handleContinueWithEmail = (e) => {
        e.preventDefault()


        handleSubmit((credentials) => {
            onSubmit(credentials)
                .then(function (response) {
                    handleSuccessLogin(response)
                })
                .catch(function ({response}) {
                    handleFailLogin(response)
                })
        })(e)
    }

    return (
        <form onSubmit={handleContinueWithEmail}>
            <div className='input-group' id="input-email-container">
                <input 
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /.+@.+\.(.){2,5}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    type="email"
                    name="email"
                    id="input-email"
                    placeholder='Email address'
                    className='form-control shadow-none'
                ></input>
            </div>

            <div className="input-group mt-3" id="input-password-container">
                <input
                    id="input-password"
                    {...register("password", {
                        required: true,
                        onChange: (event) => {
                            event.target.value.length > 0 ? setPasswordButtonVisibility(true) : setPasswordButtonVisibility(false)
                        }                        
                    })}
                    onFocus={(event) => event.target.value.length > 0 && setPasswordButtonVisibility(true) }
                    type={passwordValueVisibility ? "text" : "password"} 
                    name="password" 
                    autoComplete='true' 
                    placeholder="Password"
                    className="form-control shadow-none" 
                ></input>
                {
                    passwordButtonVisibility &&
                    <button id="show-password-btn" className="btn shadow-none" type="button" style={{color: "#909090"}} onClick={() => setPasswordValueVisibility(!passwordValueVisibility)}>
                        { passwordValueVisibility ? <FiEye className="mx-1"/> : <FiEyeOff className="mx-1"/> }
                    </button>
                }
            </div>
            <div className="mt-3 mx-2 message-error" id="message-error" hidden></div>
            <button className={`${BootstrapStyle.button} btn btn-light`} type="submit" >
                Continue with Email
            </button>
        </form>
    )
}

function LoginForm(props) {
    
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

    let signUpUrl = "#"
    if (props.signUpLink && typeof props.signUpLink == "string") {
        signUpUrl = props.signUpLink
    }

    return (
        <section className='login-card'>

            <h2 className='mb-3'>Log in</h2>

            <button className={`${BootstrapStyle.button} btn btn-light`} onClick={startWithGoogle}>
                <FcGoogle className="mx-2" />
                <span>
                    Continue with Google
                </span>
            </button>

            <button className={`${BootstrapStyle.button} btn btn-dark`} onClick={startWithGitHub}>
                <i className="bi bi-github mx-2"></i>
                <span>
                    Continue with Github
                </span>
            </button>

            <div className='or-container my-4'>
                <p className='or-divider'>
                    or
                </p>
            </div>


            <CredentialsLoginForm onSubmit={startWithEmail} onFailLogin={() => {}} onSuccessLogin={() => {}}/>

            <p className='mt-4'>
                Don´t have an account?
                <a href={signUpUrl} className='mx-2'>Sign up</a>
            </p>

        </section>
    )
}


export default LoginForm
