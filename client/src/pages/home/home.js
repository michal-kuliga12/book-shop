import BookItem from '../../components/BookItem/BookItem.js';
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import './home.scss';
import SearchMenu from '../../components/searchMenu/searchMenu.js';

const Home = () => {
  const [options, setOptions] = useState({
    category: " ",
    filter: " "
  })
  let status = ""
  const {data, loading, error} = useFetch(`
    http://localhost:5000/book?${options.filter === "new"?``:`${options.filter}=true&type=${options.category}`}`,
    "get")
  if(data.length === 0 ) {
    status = "noResults"
  }

  return (
    <div className="home">
      {/* <section className='banner'>
        <div className='bannerText'>
          <p>Witamy wszystkich miłośników książek!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim turpis purus, nec vulputate nisl ornare in. Suspendisse commodo aliquet mi id imperdiet. Curabitur quis nulla ultricies, congue odio at, feugiat velit. Nam porttitor, arcu ac </p>
        </div>
      </section> */}
      <SearchMenu 
        options={options} 
        setOptions={setOptions}
      />
      <section className="productList">
        {loading 
        ? (<p className='statusBox'>Szukanie...</p>)
        : (
          <>
            {status === "noResults" 
            ? (<p className='statusBox'>Nie znaleziono wyników dla zadanych filtrów</p>)
            : (
                <>
                  {data.map((item, key)=>{
                    return (
                    <BookItem item={item} key={key}/>
                    )
                  })}
                </>
              )
            }
          </>
          )
        }
      </section>


    </div>
  )
}

export default Home