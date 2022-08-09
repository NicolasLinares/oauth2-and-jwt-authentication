import React from 'react'
import { RegisterForm } from 'components/forms'
import { LinkButton } from 'components/buttons'
import { authController } from "services/http"

function RegisterPage() {

    const registerUser = function (credentials) {
        return authController.registerUser(credentials)
    }
    
    return (            
        <>
            <h2 className='mb-3'>Create account</h2>
            <RegisterForm onSubmit={registerUser}/>
            <LinkButton route={"/login"} previousText="Have an account yet?" linkText="Sign in"/>

        </>
    )
}


export default RegisterPage