import React, { useState } from 'react';
import Rows from './Components/Rows';
import requests from './requests';
import Banner from './Components/Banner';
import styled,{createGlobalStyle} from 'styled-components';
import Nav from './Components/NavBar';
import Footer from './Components/Footer';
import { redirect, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import ProfileScreen from './Components/ProfileScreen';


function App() {
 const [{user }, dispatch] = useStateValue()
  const navigate = useNavigate()

  useEffect(() => {
  
    onAuthStateChanged(auth,(authUser) => {
       console.log(authUser);
      if (authUser) {
        
        dispatch({
          type: "SET_USER",
          user:authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user:null
        })
        
      }

    })
    
  }, [])
  
  return (
    <>
      <GlobalStyle/>
      <BodyDiv>
        <Routes>
        
          <Route path='/login' element={
            
            <Login />
          }
             />
            
          
          
          {user ? (
            <Route  path={"/"} element={
              <>
                <Nav  />
                <Banner fetchUrl={requests.fetchNetflixOriginals} />
                <Rows title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <Rows title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Rows title="Popular" fetchUrl={requests.fetchPopularTvShows} />
                <Rows title="Documantaries" fetchUrl={requests.fetchDocumantaries} />
                <Footer />
              </>
            } />
          ) : (
            navigate('/login')
          )
          }
          {user ? (
            <Route  path='/movies' element={
              <>
                <Nav  />
                <Banner fetchUrl={requests.fetchTvShows} />
                <Rows title="Action" fetchUrl={requests.fetchActionMovies} isLargeRow />
                <Rows title="Comedy" fetchUrl={requests.fetchComedyMovies} />
                <Rows title="Romance" fetchUrl={requests.fetchRomanceMovies} />
                <Rows title="Horror" fetchUrl={requests.fetchHorrorMovies} />
                <Rows title="Favourite" fetchUrl={requests.fetchOnTheAirTvShows} />
                <Footer />
              </>
            } />
          ) : (
            navigate('/login')
          )
          }
          {user ? (
            <Route  path='/tv-shows' element={
              <>
                <Nav  />
                <Banner fetchUrl={requests.fetchPopularTvShows} />
                <Rows title="Today" fetchUrl={requests.fetchActionMovies} isLargeRow />
                <Rows title="Popular" fetchUrl={requests.fetchPopularTvShows} />
                <Rows title="Tv Shows" fetchUrl={requests.fetchOnTodayTvShows} />
                <Rows title="Favourite" fetchUrl={requests.fetchOnTheAirTvShows} />
                <Footer />
              </>
            } />
          ) : (
            navigate('/login')
          )
          }

          {user ? (
            <Route  path='/latest' element={
              <>
                <Nav  />
                <Banner fetchUrl={requests.fetchTrending} />
                <Rows title="Tv Shows" fetchUrl={requests.fetchActionMovies} isLargeRow />
                <Rows title="Favourite" fetchUrl={requests.fetchOnTheAirTvShows} />
                <Rows title="Popular" fetchUrl={requests.fetchActionMovies} />
                <Rows title="Romance" fetchUrl={requests.fetchRomanceMovies} />
                <Footer />
              </>
            } />
          ) : (
            navigate('/login')
          )
          }
          {user ? (
          <Route path='/profile' element={
            <>
              <ProfileScreen />
            </>
          } />
          ) : (
            navigate('/login')
          )
          }
          
        </Routes>

        
       
      </BodyDiv>
      
      </>
    
  ); 
}


export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-family:Arial, Helvetica, sans-serif;
    background-color: #000000;
  }
  a{
     text-decoration: none;
  }
  .MuiSvgIcon-root{
    color: white;
  }
`

const BodyDiv = styled.div`
background-color: #111;
`
