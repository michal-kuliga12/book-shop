import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './searchMenu.scss'

const SearchMenu = props => {
  // const { dispatch } = useContext(SearchContext);
  const options = [
    {
      name: "Najnowsze",
    },
    {
      name: "Rekomendowane",
    },
    {
      name: "Dostępne",
    }
  ]
  return (
    <section className='searchMenu'>
        <div className='categoryFilter'>
          <i><FontAwesomeIcon icon={faBars} /></i>
          <span>KATEGORIA</span>
        </div>
        <div className='optionsFilter'>
          {options.map((option,key)=>{
            return (
              <span onClick={()=>{}}>{option.name}</span>
            )
          })}
        </div>
        <div></div>
    </section>
  )
}

export default SearchMenu