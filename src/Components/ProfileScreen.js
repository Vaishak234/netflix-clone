import React from 'react'
import { useStateValue } from '../StateProvider'
import NavBar from './NavBar'
import './ProfileScreen.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


function ProfileScreen() {
    const [{ user }, dispatch] = useStateValue()
    const navigate = useNavigate()
     const handleAuthentication = () => {
        if (user) {
            signOut(auth)
            navigate('/login')
        }
    }
    console.log(user.email);
    
  return (
      <div className='profileScreen'>
          <NavBar />
          <div className="profileScreen__body">
              <h1>Edit Profile</h1>
              <div className="profileScreen__info">
                  <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
                  <div className="profileScreen__details">
                      <h2>{user.email}</h2>
                      <div className="profileScreen__plans">
                          <h3>Plans</h3>
                          <p>No plans Currently</p>
                          <button onClick={handleAuthentication} className='profileScreen__signOut'>Sign Out</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ProfileScreen

