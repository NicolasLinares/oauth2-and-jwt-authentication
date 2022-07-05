import React from 'react'
import { RegisterForm } from 'components/forms'
import { authController } from "services/http"

function RegisterLink ({signInLink}) {
    return (
        <p className='mt-4'>
            Have an account yet?
            <a href={signInLink} className='mx-2'>Sign in</a>
        </p>
    )
}



function RegisterPage(props) {


    const registerUser = function (credentials) {
        return authController.registerUser(credentials)
    }

    const onFailRegister = function () {
        
    }

    const onSuccessfulRegister = function () {
    }

    return (            
        <>
            <h2 className='mb-3'>Create account</h2>
            <RegisterForm onSubmit={registerUser}/>
            <RegisterLink signInLink="/login"/>
        </>
    )
}


export default RegisterPage