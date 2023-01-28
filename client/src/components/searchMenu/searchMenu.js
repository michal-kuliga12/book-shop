import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './searchMenu.scss'

const SearchMenu = ({setOptions, options} )=> {
  // const { dispatch } = useContext(SearchContext);
  const optionsList = [
    {
      name: "Najnowsze",
      dbname:""
    },
    {
      name: "Rekomendowane",
      dbName: "isFeatured"
    },
    {
      name: "Dostępne",
      dbName: "isAvailable"
    }
  ]
  return (
    <section className='searchMenu'>
        <div className='categoryFilter'>
          <i><FontAwesomeIcon icon={faBars} /></i>
          <span>KATEGORIA</span>
        </div>
        <div className='optionsFilter'>
          {optionsList.map((option,key)=>{
            return (
              <span key={key} onClick={()=>{setOptions({...options, filter:option.dbName})}}>{option.name}</span>
            )
          })}
        </div>
        <div></div>
    </section>
  )
}

export default SearchMenu