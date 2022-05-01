
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import "./loginForm.css"

function RegisterForm(props) {

    let signUpUrl = "#"
    if (props.signUpLink && typeof props.signUpLink == "string") {
        console.log("llega")
        signUpUrl = props.signUpLink
    }

    return (
        <form className='login-card'>

            <h2 className='mb-3'>Welcome</h2>

            <input type="text" placeholder='Email address' className='form-control border-secondary'></input>
            <div className="input-group mt-2">
                <input type="password" name="password" autoComplete='true' className="form-control border-secondary" placeholder="Password"></input>
                <button className="btn btn-outline-secondary border-secondary" type="button">
                    <i className="bi bi-eye"></i>
                </button>
            </div>

            <div className='or-container my-4'>
                <p className='or-divider'>
                    or
                </p>
            </div>

            <button className='btn btn-dark shadow d-flex justify-content-center'>
                <i className="bi bi-github mx-2"></i>
                <span>
                    Sign up with Github
                </span>
            </button>
            <button className='btn btn-light shadow mt-2 d-flex justify-content-center'>
                <i className="bi bi-google mx-2"></i>
                <span>
                    Sign up with Google
                </span>
            </button>
            <button className='btn btn-primary shadow mt-2 d-flex justify-content-center'>
                <i className="bi bi-facebook mx-2"></i>
                <span>
                    Sign up with Facebook
                </span>                
            </button>

            <p className='mt-4'>
                Don´t have an account?
                <a href={signUpUrl} className='mx-2'>Sign up</a>
            </p>

        </form>
    )
}


export default RegisterForm
