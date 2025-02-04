import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

import 'react-loading-skeleton/dist/skeleton.css';

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data);
        console.log(res.data[10])
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
    <div className="md:mx-16 sm:mx-8 max-sm:mx-4 mt-4">
      <div className="control sm:flex justify-between">
        <div className="search w-min relative p-2">
          <i className="bi bi-search text-black text-xl absolute top-[27%] left-[1.2rem]"></i>
          <input type="text" onChange={handleSearchChange} className='p-2 pl-10 border rounded text-black' placeholder='Search for a country...' />
        </div>
        <select name="Region" id="region" className='text-black m-2 rounded sm:px-3 max-sm:px-4 max-sm:py-2' onChange={handleRegionChange}>
          <option value="">-Choose a Region-</option>
          <option value="africa">Africa</option>
          <option value="antarctic">Antarctic</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <motion.ul
        className="countries pt-5 px-2 grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:px-0 gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
      {
        !countries ? <Skeleton count={1} className='h-[250px] cursor-not-allowed' /> :
        filteredCountries.map((country, id) => {
          return(
            <motion.li 
              key={country.cca3} 
              className="country rounded-lg shadow-md hover:shadow-2xl cursor-pointer"
              variants={item} 
              layoutId={id} 
              onClick={() => setSelectedId(id)}
            >
              <div className="flag xl:h-[220px] md:h-[170px] sm:h-[150px]">
                <img src={country?.flags?.png} className='w-[100%]' alt={country?.name?.common} />
              </div>
              <div className="details p-6">
                <h2 className="text-2xl font-semibold mb-2">{country?.name?.common}</h2>
                <p><strong>Population: </strong>{ country?.population.toLocaleString('en-US') }</p>
                <p><strong>Region: </strong> {country.region}</p>
              </div>
            </motion.li>
          )
        })
      }
      </motion.ul>

      <AnimatePresence>
        {selectedId && (
          <div className="modal-wrapper">
            <motion.div 
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              layoutId={selectedId}
              className="flex flex-col justify-center items-center"
            >
              <img className="w-[300px] rounded-lg mb-4" src={filteredCountries[selectedId].flags.png} alt={filteredCountries[selectedId].name.common} />

              <div className="p-[1rem] px-10 bg-[#2B3944] rounded-lg shadow-2xl">
                <h1 className="text-center lg:text-[3rem] md:text-[2.5rem] sm:text-[2rem] max-sm:text-[1.5rem] font-medium">{filteredCountries[selectedId].name.common}</h1>
                <div className="sm:flex sm:gap-10">
                  <div className="leading-10">
                    <p><i className="bi bi-globe"> </i><b>Native name: </b><span className="font-light">{filteredCountries[selectedId].name.nativeName?.eng?.official}</span></p>
                    <p>
                      <i className="bi bi-people"> </i>
                      <b>Population: </b>
                      <span className="font-light">{ filteredCountries[selectedId].population.toLocaleString('en-US') }</span>
                    </p>
                    <p><i className="bi bi-geo-alt"> </i><b>Region: </b><span className="font-light">{ filteredCountries[selectedId].region }</span></p>
                    <p><i className="bi bi-asterisk"> </i><b>Capital: </b><span className="font-light">{ filteredCountries[selectedId].capital[0] }</span></p>
                  </div>
                  <div className="leading-10">
                    <p><i className="bi bi-clock"> </i><b>Time Zones: </b><span className="font-light">{ filteredCountries[selectedId].timezones[0] }</span></p>
                    <p><i className="bi bi-square"> </i><b>Area: </b><span className="font-light">{ filteredCountries[selectedId].area.toLocaleString('en-US') }</span> km<sup>2</sup></p>
                  </div>
                </div>
              </div>

              <a href={filteredCountries[selectedId].maps.googleMaps} target="_blank" className="mt-2 text-blue-700 hover:text-blue-500 transition-2" rel="noreferrer">Google Maps <i className="bi bi-arrow-up-right"></i></a>
              <motion.button 
                className="absolute top-4 right-8" 
                onClick={() => setSelectedId(null)}
              ><i className="bi bi-x-lg text-2xl"></i></motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home