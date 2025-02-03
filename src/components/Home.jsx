import { useEffect, useState } from 'react'
import { Link } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios'

import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  function searchCountry(country) {
    const filterBySearch = countries.filter((item) => item.name.common.toLowerCase().includes(country.toLowerCase()))
    setCountries(filterBySearch);
  }
  
  return (
    <div className="ml-16 mr-16 mt-4">
      <div className="control">
        <div className="search p-2">
          <div className="icon"></div>
          <input type="text" onChange={e => searchCountry(e.target.value)} className='p-2 border rounded text-black' placeholder='Search for a country...' />
        </div>
        <div className="filter p-2"></div>
      </div>
      <div className="countries p-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {
          !countries ? <Skeleton count={1} className='h-[250px] cursor-not-allowed' /> :
          countries.map((country, id) => {
            return (
              <Link to={`/country/${country.name.common}`} className="country rounded shadow-md duration-200 hover:bg-[#364550]" key={country.name.common + id}>
                <div className="flag">
                  <img src={country?.flags?.png} className='w-[100%]' alt={country?.name?.common} />
                </div>
                <div className="details p-2 pl-4 pr-4">
                  <h2 className="text-xl mb-2">{country?.name?.common}</h2>
                  <p><strong>Population:</strong>{ country?.population.toLocaleString('en-US') }</p>
                  <p><strong>Region:</strong> {country.region}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home