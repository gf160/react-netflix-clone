import React, { useRef } from 'react'
import './MovieModal.css'
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export default function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    realease_date,
    first_air_date,
    vote_average,
    setModalOpen
}) {
  const ref = useRef();
  useOnClickOutside(ref, () =>  {
    //클릭이 modal 안인지 밖인지 판단.
    setModalOpen(false);
  });
  return (
    <div className='persentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={() => setModalOpen(false)}>x</span>
          <img 
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt='modal__postrer-img'
          />

          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'>
                100% for you
              </span>
              {realease_date ? realease_date : first_air_date}
            </p>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'> 평점: {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
