import React, { useState, useEffect } from 'react'
import requests from '../api/requests';
import instance from '../api/axios';
import "./Banner.css"
import styled from 'styled-components';

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        //현재 상영중인 영화 정보 가져오기(비동기로)
        const resMovieList = await instance.get(requests.fetchNowPlaying);
        //1개 영화의 ID를 가져온다.
        const movieId = resMovieList.data.results[
            Math.floor(Math.random() * resMovieList.data.results.length)
        ].id;
        
        //특정 영화의 상세한 정보 가져오기
        const {data: resMovieInfo} = await instance.get(`movie/${movieId}`, {
            params: {append_to_response: "videos" },
        });
        console.log(resMovieInfo);
        setMovie(resMovieInfo)
    }

    const truncate = (_str, _maxLength) => {
        return _str?.length > _maxLength ? _str.substring(0, _maxLength -3) + "..." : _str
    }

    if(isClicked){
        return <Container>
                <HomeContainer>
                    <Iframe width="640" height="360" 
                        title="YouTube video player" 
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} 
                        frameborder="0" 
                        allow="autoplay; fullscreen" 
                        allowfullscreen
                    ></Iframe>
                </HomeContainer>
        </Container>
    } else {
        return <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: 'cover'
                }}
            >
                <div className='banner__contents'>
                    <h1>{movie.title || movie.name || movie.original_name}</h1>
                    <div className='banner__buttons'>
                        <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
                        <button className='banner__button info'>More</button>
                    </div>
                    <h1 className='banner__description'>{truncate(movie?.overview, 100)}</h1>
                </div>
                <div className='banner--fadeBottom'></div>
        </header>
    }
    
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    felx-direction: column;
    width: 100%;
    height: 100vh;
`
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`


export default Banner;