import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./BookItem.scss"

const BookItem = ({item,key}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${item._id}`)
  }
  return (
    <>
        <img width={120} height={180} src={item.images[0]} alt=""></img>
        <div className='itemDown'>
          <div className='itemDetails'>
            <p className="title">{item.title}</p>
            <div>
              <p className="details">{item.author}</p>
              <p className="details">{item.price} zł</p>
            </div>
          </div>
          <button onClick={handleClick}>SPRAWDŹ</button>
        </div>
    </>
  )
}

export default BookItem