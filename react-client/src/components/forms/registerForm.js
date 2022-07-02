
import React from 'react'
import { useForm } from "react-hook-form"
import { LoginButton as RegisterButton } from 'components/buttons'
import { EmailInput, PasswordInput, FullNameInput } from 'components/inputs'
import "./loginForm.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'



function ConfirmPassword() {
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mandatory')
            .min(3, 'Password must be at 3 char long'),
        confirmPwd: Yup.string()
            .required('Password is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState
    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        return false
    }
    return (
        <div className="container mt-5">
            <h2>React Confirm Password Validation Example</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        name="confirmPwd"
                        type="password"
                        {...register('confirmPwd')}
                        className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
            Submit
                    </button>
                </div>
            </form>
        </div>
    )
}


function RegisterForm({onSubmit, onFailLogin, onSuccessLogin}) {

    const formSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full name is mandatory'),
        email: Yup.string()
            .required('Email address is mandatory'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(3, 'Password must be at 3 char long'),
        passwordConfirmation: Yup.string()
            .required('Password confirmation is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
      
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const hideErrorMessageFeedback = function() {
        let errorMessage = document.getElementById("message-error")
        errorMessage.hidden = true
        errorMessage.innerText = ""
    }
    const showErrorMessageFeedback = function(message) {
        let errorMessage = document.getElementById("message-error")
        errorMessage.hidden = false
        errorMessage.innerText = message
    }

    const handleFailLogin = function (errorMessage) {
        showErrorMessageFeedback(errorMessage)
        typeof(onFailLogin) == "function" && onFailLogin(errorMessage)
    }
    const handleSuccessLogin = function ({data}) {
        hideErrorMessageFeedback()
        typeof(onSuccessLogin) == "function" && onSuccessLogin(data)
    }

    const handleRegisterUser = (e) => {
        e.preventDefault()

        handleSubmit((credentials) => {
            onSubmit(credentials)
                .then(function (response) {
                    handleSuccessLogin(response)
                })
                .catch(function (error) {
                    handleFailLogin(error.message)
                })
        })(e)
    }

    return (
        <form onSubmit={handleRegisterUser}>
            <FullNameInput
                onRegister={register("fullname", {required: true})}
                inputName="fullname"
                label="Full name"
                placeholder="Enter your full name"
                className={errors.fullname ? 'is-invalid' : ''}
                errorMessage={errors.fullname?.message}
            />
            <EmailInput 
                onRegister={register("email", {required: true})}
                inputName="email"
                label="Email address"
                placeholder="name@example.com"
                className={errors.email ? 'is-invalid' : ''}
                errorMessage={errors.email?.message}
            />
            <PasswordInput
                onRegister={register("password", {required: true})}
                inputName="password"
                label="Password"
                placeholder="Enter your password"
                className={errors.password ? 'is-invalid' : ''}
                errorMessage={errors.password?.message}
            />
            <PasswordInput
                onRegister={register("passwordConfirmation", {required: true})}
                inputName="passwordConfirmation"
                label="Confirm password"
                placeholder="Confirm your password"
                className={errors.passwordConfirmation ? 'is-invalid' : ''}
                errorMessage={errors.passwordConfirmation?.message}
            />

            <RegisterButton
                textContent={"Sign up"} 
            />
        </form>
    )
}


export default RegisterForm
