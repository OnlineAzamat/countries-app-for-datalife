import { useEffect, useState } from 'react'
import { Link } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios'

import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? country.region.toLowerCase() === selectedRegion.toLowerCase() : true;
    return matchesSearch && matchesRegion;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  
  return (
    <div className="ml-16 mr-16 mt-4">
      <div className="control flex ">
        <div className="search w-min relative p-2">
          <i className="bi bi-search text-black text-xl absolute top-[27%] left-[1.2rem]"></i>
          <input type="text" onChange={handleSearchChange} className='p-2 pl-10 border rounded text-black' placeholder='Search for a country...' />
        </div>
        <select name="Region" id="region" className='text-black m-2 rounded px-3' onChange={handleRegionChange}>
          <option value="">-Choose a Region-</option>
          <option value="africa">Africa</option>
          <option value="antarctic">Antarctic</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="countries pt-5 px-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {
          !filteredCountries ? <Skeleton count={1} className='h-[250px] cursor-not-allowed' /> :
          filteredCountries.map((country, id) => {
            return (
              <Link to={`/country/${country.name.common}`} className="country rounded-lg shadow-md hover:shadow-2xl" key={country.name.common + id}>
                <div className="flag">
                  <img src={country?.flags?.png} className='w-[100%]' alt={country?.name?.common} />
                </div>
                <div className="details p-4">
                  <h2 className="text-2xl font-semibold mb-2">{country?.name?.common}</h2>
                  <p><strong>Population: </strong>{ country?.population.toLocaleString('en-US') }</p>
                  <p><strong>Region: </strong> {country.region}</p>
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