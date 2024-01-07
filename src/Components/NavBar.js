import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


function NavBar({isFree}) {

    const [show, handleshow] = useState(false)
    const [showNav,setShowNav]= useState(false)
    const navigate = useNavigate()
    const [{ user }, dispatch] = useStateValue()

    const handleNav = () => {
        setShowNav(!showNav)
    }
     
       useEffect(() => {
        
        window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            handleshow(true)
        } else {
            handleshow(false)
        }
            return () => {
            window.removeEventListener('scroll')
            }
           
          })
       }, [])
    
     const handleAuthentication = () => {
        if (user) {
            signOut(auth)
            navigate('/login')
        }
     }

  
  return (
      <>
          <Nav show={show?true:false} showNav={showNav}>
              <NavLeft showNav={showNav}>
                  <NavLogo src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='NETFLIX LOGO' />
                  {
                      user && <>
                          <NavLinks
                            onClick={()=>setShowNav(false)}
                              showNav={showNav}>
                                    <Link to={'/'}><NavLink>Home</NavLink></Link>
                                    <Link to={'/movies'}><NavLink>Movies</NavLink></Link>
                                    <Link to={'/tv-shows'}><NavLink>TV Shows</NavLink></Link>
                                    <Link to={'/latest'}><NavLink>Latest</NavLink></Link>
                                    <NavLink>
                                       <NavSignOutBtn onClick={handleAuthentication} showNav={showNav}>
                                         Sign Out
                                        </NavSignOutBtn>
                                    </NavLink>
                                    
                          </NavLinks>
                          <NavButton
                             onClick={handleNav}>
                              {showNav?(<ClearIcon fontSize='large'/>  ):(<MenuIcon fontSize='large' />)}       
                            
                              </NavButton>
                      </>
                 }
              </NavLeft>
              {
                  user && <NavRight>
                  
                      <SearchIcon />
                      <span>Kids</span>
                      <NotificationsIcon />
                      <Link to={'/profile'}>
                          <NavAvatar src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' />
                      </Link>
                      <span onClick={handleAuthentication}>Sign Out</span>
                  </NavRight>
              }
          </Nav>
      </>
  )
}

export default NavBar

const Nav = styled.nav`
width: 100%;
display: flex;
margin:0;
justify-content: space-between;
align-items:center;
position:fixed;
align-items: center;
padding: 0px 0px 15px 0px;
top: 0;
color: white;
background-color: ${props => props.show ? 'black' : ''};
transition: all 0.2s ease-in;
z-index: 99999;

`
const NavLeft = styled.div`
display: flex;
padding-top:20px;
justify-content: space-between;
align-items: center;
color: white;

@media (max-width: 768px) {
    background-color: ${(props)=>(props.showNav ? "black":"")};
    width: 100%;
    height: ${(props)=>(props.showNav ? "100vh":"")};
    align-items: flex-start;


}
  
`
const NavButton = styled.span`
display: none;
position: absolute;
right: 30px;
@media (max-width: 768px) {
    display: block;

}
`
const NavLinks = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
height: 10px;
list-style: none;
column-gap: 20px;
@media (max-width: 768px) {
    width: 100px;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100px;
    left:calc(50% - 100px);
    text-align: center;
    display:${(props) => (props.showNav ? "block" : "none")};
  }
`
const NavLink = styled.li`
color: white;
text-decoration: none;
@media (max-width: 768px) {
    margin-bottom: 80px;
    
  }

`
const NavSignOutBtn = styled.span`
display:${(props) => (props.showNav ? "block" : "none")};
`

const NavRight = styled.div`
 display: flex;
  padding-top:20px;
 float: right;
 justify-content: space-between;
 position: fixed;
 right: 30px;
 color: white;
 align-items: center;
 gap: 15px;
 @media (max-width: 768px) {
    display: none;
  }
` 


const NavLogo = styled.img`
position: relative;
left: 30px;
width: 130px;
margin-right: 30px;
object-fit: contain;

`
const NavAvatar = styled.img`
width: 30px;
margin: 0;
object-fit: contain;

`