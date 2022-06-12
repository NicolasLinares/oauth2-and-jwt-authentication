import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import "./loginForm.css"
import { CONST } from "config"
import { authController, usersController } from "services/http"

import { useForm } from "react-hook-form"

const BootstrapStyle = {
    button: 'mt-3 p-3 w-100 d-flex justify-content-center align-items-center',
}

function CredentialsLoginForm (props) {

    
    useEffect(() => {
        (function () {
            'use strict'
            var form = document.querySelectorAll('.needs-validation')[0]
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            })
        })()
    }, [])

    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [passwordButtonVisibility, setPasswordButtonVisibility] = useState(false)
    const [passwordValueVisibility, setPasswordValueVisibility] = useState(false)

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='needs-validation' noValidate>
            <div className='input-group has-validation'>
                <input 
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /.+@.+\.(.){2,5}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    required
                    type="email"
                    name="email"
                    id="input-email"
                    placeholder='Email address'
                    className='form-control'
                ></input>
            </div>

            <div id="input-group-password" className="input-group mt-2">
                <input
                    {...register("password", {
                        required: true,
                        onChange: (event) => {
                            event.target.value.length > 0 ? setPasswordButtonVisibility(true) : setPasswordButtonVisibility(false)
                        }                        
                    })}
                    onFocus={(event) => event.target.value.length > 0 && setPasswordButtonVisibility(true) }
                    required
                    type={passwordValueVisibility ? "text" : "password"} 
                    name="password" 
                    autoComplete='true' 
                    placeholder="Password"
                    className="form-control" 
                ></input>
                {
                    passwordButtonVisibility &&
                    <button id="show-password-btn" className="btn shadow-none" type="button" style={{color: "#909090"}} onClick={() => setPasswordValueVisibility(!passwordValueVisibility)}>
                        { passwordValueVisibility ? <FiEye className="mx-1"/> : <FiEyeOff className="mx-1"/> }
                    </button>
                }
            </div>

            <button className={`${BootstrapStyle.button} btn btn-light`} type="submit" >
                Continue with Email
            </button>
        </form>
    )
}

function LoginForm(props) {
    
    let startWithGitHub = function (e) {
        e.preventDefault()
        authController.startWith(CONST.uri.provider.GITHUB, usersController.fetchUser)
    }

    let startWithGoogle = function (e) {
        e.preventDefault()
        authController.startWith(CONST.uri.provider.GOOGLE, usersController.fetchUser)
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


            <CredentialsLoginForm />

            <p className='mt-4'>
                Don´t have an account?
                <a href={signUpUrl} className='mx-2'>Sign up</a>
            </p>

        </section>
    )
}


export default LoginForm
