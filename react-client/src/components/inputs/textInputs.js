import React, { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"

function EmailInput ({onRegister}) {
    return (
        <input
            {...onRegister}
            type="email"
            name="email"
            placeholder="Email address"
            className="form-control shadow-none"
        ></input>
    )
}

function PasswordInput ({onRegister, onChange, type}) {

    const [passwordValueVisibility, setPasswordValueVisibility] = useState(false)
    const [passwordButtonVisibility, setPasswordButtonVisibility] = useState(false)


    return (
        <div className="input-group mt-3">
            <input
                {...onRegister}
                type={passwordValueVisibility ? "text" : "password"} 
                name="password" 
                placeholder="Password"
                className="form-control shadow-none"
                onChange={(event) => event.target.value.length > 0 ? setPasswordButtonVisibility(true) : setPasswordButtonVisibility(false)}       
            ></input>
            {
                passwordButtonVisibility &&
                <button id="show-password-btn" className="btn shadow-none" type="button" style={{color: "#909090"}} onClick={() => setPasswordValueVisibility(!passwordValueVisibility)}>
                    { passwordValueVisibility ? <FiEye className="mx-1"/> : <FiEyeOff className="mx-1"/> }
                </button>
            }
        </div>
    )
}

export {
    EmailInput,
    PasswordInput,
}