import React from 'react'
import "./BookItem.scss"

const BookItem = ({item,key}) => {
  return (
    <div className='container'>
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
              <button>SPRAWDŹ</button>
            </div>
        </div>
    </div>
  )
}

export default BookItem