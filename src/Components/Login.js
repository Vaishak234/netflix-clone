import './Login.css'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {  useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { CircularProgress } from '@mui/material'
import { useStateValue } from '../StateProvider';



function Login() {
    const [load,setLoad]= useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
  const navigate = useNavigate()
   const [{user }, dispatch] = useStateValue()

  
  useEffect(() => {
    if (user && user != undefined) {
        navigate('/')
      }
          setTimeout(() => {
            setLoad(true)
          }, 1000);
  
    },[load])

    

    function signIn(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email,password).then((userCredentials) => {
            if (userCredentials) {
              navigate('/')
            }
        }).catch((error) => {
            let errorCode= error.code.split("auth/")[1]
            setError(errorCode);
        })

    }
     function register(e) {
        e.preventDefault()
        
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials)
            if (userCredentials) {
               navigate('/')
            }
            
        }).catch(error => {
           let errorCode= error.code.split("auth/")[1]
            setError(errorCode);
        })
    }
        


  return (
    <>
       <div className='login__body'>
      {load ? (
          <>
          <div className="login__logo">
        <img width="170px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" />
      </div>
         <div class="login">
        <h1 class="login__title">Sign In</h1>
             <p className='errormsg'>{ error?error:"" }</p>
              <div class="login__group">
            <input class="login__group__input1" placeholder='Enter your Email' value={email} onChange={e=> setEmail(e.target.value)}  type="text" required="true"/>
                 
              </div>
       
           <br />
           <div class="login__group">
             <input class="login__group__input2" type="password" placeholder='password' value={password} onChange={e=> setPassword(e.target.value)}  required="true"/>
           </div>
           <button class="login__sign-in" type="button" onClick={signIn}>Sign In</button>
        <div class="login__secondary-cta">
          <div className="login__secondary-cta__left">
            <input type="checkbox" name="" id="" />
            <a class="login__secondary-cta__text" href="#">Remember me</a>
          </div>
          <a class="login__secondary-cta__text login__secondary-cta__text--need-help" href="#">Need help?</a></div>
          <div className="register">
          <h4 className='register__title'>New to Netflix? <span className='register__btn' onClick={register}>Sign up now</span></h4>
          <div className="register_msg">
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot <span>Learn more</span></p>
          </div>
        </div>
           
            </div>
          </>
    
      ) : (
          <div className="loader">
             <CircularProgress />
         </div>
      )
        }
      </div>
    </>
  )
}

export default Login