import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./BookItem.scss"

const BookItem = ({item,key}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${item._id}`)
  }
  return (
    <div className='itemBox'>
        <div className="itemImgBox">
            <img src={item.images[0]} alt=""></img>
        </div>
        <div className='itemInfoBox'>
          <div>
            <p className="title">{item.title}</p>
            <p className="details">{item.author}</p>
            <p className="details">{item.price}</p>
          </div>
          <button onClick={handleClick}>SPRAWDŹ</button>
        </div>
    </div>
  )
}

export default BookItem