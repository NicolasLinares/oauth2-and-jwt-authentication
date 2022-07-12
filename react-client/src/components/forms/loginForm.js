import React from 'react'
import { useForm } from "react-hook-form"
import { LoginButton } from 'components/buttons'
import { EmailInput, PasswordInput } from 'components/inputs'
import "./loginForm.css"

function CredentialsLoginForm ({onSubmit, onSuccessLogin}) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleFailLogin = function ({response}) {
        let { error } = response.data
        showErrorMessageFeedback(error)

        function showErrorMessageFeedback (message) {
            let errorMessage = document.getElementById("message-error")
            errorMessage.hidden = false
            errorMessage.innerText = "Incorrect email or password"
        }
    }
    const handleSuccessLogin = function ({data}) {
        hideErrorMessageFeedback()
        typeof(onSuccessLogin) == "function" && onSuccessLogin(data)

        function hideErrorMessageFeedback () {
            let errorMessage = document.getElementById("message-error")
            errorMessage.hidden = true
            errorMessage.innerText = ""
        }
    }

    const handleContinueWithEmail = (e) => {
        e.preventDefault()

        handleSubmit((credentials) => {
            onSubmit(credentials)
                .then(handleSuccessLogin)
                .catch(handleFailLogin)
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

            <div className="mt-3 mx-2 message-error" id="message-error" hidden></div>

            <LoginButton
                textContent={"Continue with email"}
                onClick={onSubmit}
            />
        </form>
    )
}

export default CredentialsLoginForm
