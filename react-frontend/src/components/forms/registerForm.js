
import React from 'react'
import { useForm } from "react-hook-form"
import { LoginButton as RegisterButton } from 'components/buttons'
import { EmailInput, PasswordInput, FullNameInput } from 'components/inputs'
import "./loginForm.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function RegisterForm({onSubmit}) {

    let navigate = useNavigate()

    const MAX_LENGTH_FULLNAME = 64
    const MAX_LENGTH_EMAIL = 128
    const MAX_LENGTH_PASSWORD = 64

    const formSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full name is mandatory'),
        email: Yup.string()
            .required('Email address is mandatory')
            .email('Must be a valid email'),
        password: Yup.string()
            .required('Password is mandatory')
            .min(8, 'Password require at least 8 characters'),
        passwordConfirmation: Yup.string()
            .required('Password confirmation is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
      
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors }, setError } = useForm(formOptions)

    const handleFailRegister = function ({response}) {
        let { error } = response.data
        error.email && setError("email", { message: error.email }, { shouldFocus: true })
        error.password && setError("password", { message: error.password }, { shouldFocus: true })
        error.fullname && setError("fullname", { message: error.fullname }, { shouldFocus: true })
    }

    const handleSuccessRegister = function () {
        navigate("/login")
    }

    const handleRegisterUser = (e) => {
        e.preventDefault()

        handleSubmit((userInformation) => {
            onSubmit(userInformation)
                .then(handleSuccessRegister)
                .catch(handleFailRegister)
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
                maxLength={MAX_LENGTH_FULLNAME}
            />
            <EmailInput 
                onRegister={register("email", {required: true})}
                inputName="email"
                label="Email address"
                placeholder="name@example.com"
                className={errors.email ? 'is-invalid' : ''}
                errorMessage={errors.email?.message}
                maxLength={MAX_LENGTH_EMAIL}
            />
            <PasswordInput
                onRegister={register("password", {required: true})}
                inputName="password"
                label="Password"
                placeholder="Enter your password"
                className={errors.password ? 'is-invalid' : ''}
                errorMessage={errors.password?.message}
                maxLength={MAX_LENGTH_PASSWORD}
            />
            <PasswordInput
                onRegister={register("passwordConfirmation", {required: true})}
                inputName="passwordConfirmation"
                label="Confirm password"
                placeholder="Confirm your password"
                className={errors.passwordConfirmation ? 'is-invalid' : ''}
                errorMessage={errors.passwordConfirmation?.message}
                maxLength={MAX_LENGTH_PASSWORD}
            />

            <RegisterButton
                textContent={"Sign up"} 
            />
        </form>
    )
}


export default RegisterForm
