import React from 'react'
import { useForm } from "react-hook-form"
import { LoginButton } from 'components/buttons'
import { EmailInput, PasswordInput } from 'components/inputs'
import "./loginForm.css"

function CredentialsLoginForm ({onSubmit, onFailLogin, onSuccessLogin}) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })


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

    const handleFailLogin = function ({status, data}) {
        showErrorMessageFeedback(data.error)
        typeof(onFailLogin) == "function" && onFailLogin(data.error)
    }
    const handleSuccessLogin = function ({data}) {
        hideErrorMessageFeedback()
        typeof(onSuccessLogin) == "function" && onSuccessLogin(data)
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
