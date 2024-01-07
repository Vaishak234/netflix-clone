import axios from '../axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


function Banner({fetchUrl}) {
    const [movie, setMovie] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            const randomNum = Math.floor(Math.random()*request.data.results.length)
            setMovie(request.data.results[randomNum]);
            
        }
        fetchData()
        

    }, [fetchUrl])
    
    function truncate(str) {
    return str? str.substring(0, 150) + "..." : str;
    } 
    
    
  return (
      
      <>
          
             <Bannerdiv style={{background:`url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}}>
         
          <BannerContents >
              <BannerTitle>
                  {movie.name}
              </BannerTitle>
              <BannerButton>
                  <Button>Play</Button>
                  <Button>My List</Button>
              </BannerButton>
               <BannerDescription>
                  {truncate(movie.overview)}
              </BannerDescription> 
          </BannerContents>
        <FadeBottom></FadeBottom>
      </Bannerdiv>
             
            
         
          
      </>
      
  )
}

export default Banner

const Bannerdiv = styled.header`
 height: 468px;
 color: white;
 background-repeat: no-repeat;
 background-size:cover;
 background-position: center;
 width: 100%;
 margin-bottom: 3rem;
`
const BannerContents = styled.header`
margin-left: 30px;
padding-top: 140px;
padding-right: 10px;

`
const CircularLoader = styled.div`
display: grid;
place-items: center;
height: 448px;
`

const BannerButton = styled.div``

const BannerTitle = styled.h1`
font-size: 3rem;
margin-bottom: .5rem;
 @media (max-width: 768px) {
   font-size: 2.1rem;

}
`

const Button = styled.button`
outline: none;
border: none;
font-weight: 700;
border-radius: .2rem;
padding-inline:2rem;
margin-right: 1rem;
padding-bottom: 0.5rem;
padding-top: 0.5rem;
background-color: rgba(51,51,51,.5);
cursor: pointer;
color: white;

:hover{
    background-color:white;
    color: black;
}

`

const BannerDescription = styled.p`
max-width: 360px;
line-height: 1.3;
padding-top:1rem ;
font-size: 1rem;
 @media (max-width: 768px) {
    max-width: 300px;
    max-height: 60px;
    overflow: hidden;
}
`
const FadeBottom = styled.div`
height: 7.4rem;
width: 100%;
`