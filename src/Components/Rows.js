import React, { useEffect, useState } from 'react'
import axios from "../axios";
import styled from 'styled-components';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Skeleton from '@mui/material/Skeleton';



const base_imgurl="http://image.tmdb.org/t/p/original/"

function Rows({ title ,fetchUrl,isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState()
    const [loading ,setLoading] =  useState(false)
    
    useEffect(() => {
     
        async function fetchData() {
            setLoading(true)
            const request = await axios.get(fetchUrl)
            request.data.results.splice(0, 2)
            setMovies(request.data.results);
            setLoading(false)
           
        }
        fetchData()
       

         

    }, [fetchUrl])

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                     console.log(trailerUrl);
                }).catch((err) => {
                console.log(err);
            })
        }
    }
   
  return (
      <>
          
         <Row>
              <RowTitle>{title}</RowTitle>
              
              <RowPosters >
                  {
                      movies.map((movie) => {
                          return (
                              loading ? (
                                  <>
                                      <Loader isLargeRow={isLargeRow ? true : false}>
                                          <Skeleton  
                                              sx={{ bgcolor: 'grey.900' }}
                                              variant="rectangular"
                                              width={isLargeRow ? '120px' : '150px'}
                                              height={isLargeRow ? '190px' : '90px'}
                                          />
                                      </Loader>
                                  </>
                              ) : (
                                  <RowPoster  isLargeRow={isLargeRow ? true : false} onClick={() => handleClick(movie.name ? movie.name : movie.title)} key={movie.id} width={400} src={`${base_imgurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                              )
                        
                          )
                      })
        
                     
                  }
          </RowPosters>
             
              </Row>
           
        
              {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        
      </>
  )
}

export default Rows

const Row = styled.div`
margin: 20px;
color: white;
 @media (max-width: 768px) {
    margin: 10px;
}

`

const RowPosters = styled.div`
display:flex;
overflow-y:hidden;
overflow-x:scroll;
padding: 10px;
&::-webkit-scrollbar {
 display: none;
}
 @media (max-width: 768px) {
   padding: 5px;
}
`

const RowTitle = styled.h1`
margin: 0;
 @media (max-width: 768px) {
   font-size: 1.3rem;
}
`

const RowPoster = styled.img`
width: 100%;
object-fit: contain;
max-height: ${props=>props.isLargeRow?'250px':'150px'};
margin-right: 15px;
transition: transform 450ms;
 @media (max-width: 768px) {
   max-height: ${props=>props.isLargeRow?'150px':'80px'};

}
:hover{
    transform:scale(1.08);
}
`
const Loader = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    object-fit: contain;
    margin-right: 15px;
    transition: transform 450ms;
    @media (max-width: 768px) {
      max-height: ${props=>props.isLargeRow?'150px':'80px'};

    }

`

