import React from 'react'

const Card = ({image}) => {
    
  return (
    <div className='w-10'>
        <img src={image} alt="card image" />
    </div>
  )
}

export default Card