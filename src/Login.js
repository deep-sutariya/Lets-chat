import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'


function Login() {

    const [{ }, dispatch] = useStateValue(); //hook created in StateProvider


    //for Signup using email
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                // console.log(result)
                // redux reactcontex
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(error => alert(error));
    }

    return (
        <div className='login'>
            <div className='login_container'>

                <img src="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg" alt='' />

                <div className='login_text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type='submit' onClick={signIn}>Sign In With Google</Button>

            </div>
        </div>
    )
}

export default Login;