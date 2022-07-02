import React, { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { BootstrapStyle } from "assets/bootstrapStyle"

function FormGroup({label, errorMessage, children}) {
    return (
        <div className={BootstrapStyle.formGroup  + " position-relative"}>
            <div className={BootstrapStyle.floatingLabel}>
                {children}
                {
                    label &&
                    <label htmlFor="floatingInput" className="form-label">
                        {label}
                    </label>
                }
            </div>
            <small className="invalid-feedback">
                {errorMessage}
            </small>
        </div>
    )
}

function EmailInput ({onRegister, inputName, label, placeholder, className, errorMessage, maxLength}) {
    return (
        <FormGroup label={label} errorMessage={errorMessage}>
            <input
                {...onRegister}
                type="email"
                autoComplete="username"
                name={inputName}
                placeholder={placeholder || ""}
                className={`${BootstrapStyle.input} ${className}`}
                maxLength={maxLength}
            ></input>
        </FormGroup>
    )
}

function FullNameInput ({onRegister, inputName, label, placeholder, className, errorMessage, maxLength}) {
    return (
        <FormGroup label={label} errorMessage={errorMessage}>
            <input
                {...onRegister}
                type="text"
                autoComplete="username"
                name={inputName}
                placeholder={placeholder || ""}
                className={`${BootstrapStyle.input} ${className}`}
                maxLength={maxLength}
            ></input>
        </FormGroup>
    )
}

function PasswordInput({onRegister, inputName, label, placeholder, className, errorMessage, maxLength}) {

    const [passwordValueVisibility, setPasswordValueVisibility] = useState(false)
    const [passwordButtonVisibility, setPasswordButtonVisibility] = useState(false)

    return (
        <FormGroup label={label} errorMessage={errorMessage}>
            <input
                {...onRegister}
                type={passwordValueVisibility ? "text" : "password"} 
                name={inputName}
                placeholder={placeholder || ""}
                className={`${BootstrapStyle.input} ${className}`}
                autoComplete={"new-password"}
                maxLength={maxLength}
                onChange={(event) => event.target.value.length > 0 ? setPasswordButtonVisibility(true) : setPasswordButtonVisibility(false)}       
            ></input>
            {
                passwordButtonVisibility &&
                <button id="password-btn" className={BootstrapStyle.passwordButton} type="button" onClick={() => setPasswordValueVisibility(!passwordValueVisibility)}>
                    { passwordValueVisibility ? <FiEye className="mx-1"/> : <FiEyeOff className="mx-1"/> }
                </button>
            }
        </FormGroup>
    )
}

export {
    EmailInput,
    PasswordInput,
    FullNameInput
}