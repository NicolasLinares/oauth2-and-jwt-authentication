import React from 'react'
import { useForm } from "react-hook-form"
import { LoginButton } from 'components/buttons'
import { EmailInput, PasswordInput } from 'components/inputs'
import "./loginForm.css"

function CredentialsLoginForm ({onSubmit, messageError}) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleContinueWithEmail = (e) => {
        e.preventDefault()

        handleSubmit((credentials) => {
            onSubmit(credentials)
        })(e)
    }

    return (
        <form onSubmit={handleContinueWithEmail}>
            <EmailInput 
                onRegister={register("email", {
                    required: true,
                    pattern: {
                        value: /.+@.+\.(.){2,5}$/i,
                        message: "Invalid email address"
                    }
                })}
                inputName="email"
                label="Email address"
                placeholder="Enter your email"
            />
            <PasswordInput
                onRegister={register("password", {
                    required: true            
                })}
                inputName="password"
                label="Password"
                placeholder="Enter password"
            />

            <div className="mt-3 mx-2 message-error" id="message-error">{messageError}</div>

            <LoginButton
                textContent={"Continue with email"}
                onClick={onSubmit}
            />
        </form>
    )
}

export default CredentialsLoginForm
