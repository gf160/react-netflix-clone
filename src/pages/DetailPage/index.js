import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({});
  console.log('movieId', movieId);

  useEffect(() => {
    async function fetchData(){
      const res = await axios.get(`/movie/${movieId}`)
      console.log('res', res);
      setMovie(res.data);
    }
    fetchData();
  }, [movieId]);

  if(!movie) return <div>...loatind</div>;

  return (
    <section>
      <img 
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}
