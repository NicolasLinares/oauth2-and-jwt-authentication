import React from 'react'
import { LoginOptionsCard } from 'components/forms'

function RegisterLink ({signUpLink}) {
    return (
        <p className='mt-4'>
            Don´t have an account?
            <a href={signUpLink} className='mx-2'>Sign up</a>
        </p>
    )
}


function LoginPage(props) {
    return (
        <>
            <LoginOptionsCard />
            <RegisterLink signUpLink="/register"/>
        </>
    )
}


export default LoginPage