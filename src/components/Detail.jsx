import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Detail = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.log(err))
  }, [name])
  
  return (
    <div className="ml-16 mr-16 mt-4">
      <Link to="/" className="back flex rounded-full drop-shadow-md"><i className="bi bi-arrow-left-short text-xl"></i></Link>

      <div className="container pt-8 sm:justify-between sm:flex">
        <div className="flag-img sm:w-[50%] border">
          {
            data?.flags?.png ? <img src={data?.flags?.png} className="w-[80%]" alt={data?.name.common} /> :
            <Skeleton count={1} className="h-[250px]" />
          }
        </div>
        <div className="sm:w-[40%] p-[1rem] border">
          <h1 className="lg:text-[4rem] md:text-[2.5rem] sm:text-[2rem] max-sm:text-[1.5rem] font-medium">{data?.name.common}</h1>
          <div className="sm:flex sm:gap-10">
            <div className="leading-10">
              <p><i className="bi bi-globe"> </i><b>Native name: </b><span className="font-light">{data?.name.nativeName?.eng?.official}</span></p>
              <p>
                <i className="bi bi-people"> </i>
                <b>Population: </b>
                <span className="font-light">{ data?.population.toLocaleString('en-US') }</span>
              </p>
              <p><i className="bi bi-geo-alt"> </i><b>Region: </b><span className="font-light">{ data?.region }</span></p>
              <p><i className="bi bi-asterisk"> </i><b>Capital: </b><span className="font-light">{ data?.capital[0] }</span></p>
            </div>
            <div className="leading-10">
              <p><i className="bi bi-clock"> </i><b>Time Zones: </b><span className="font-light">{ data?.timezones[0] }</span></p>
              <p><i className="bi bi-square"> </i><b>Area: </b><span className="font-light">{ data?.area.toLocaleString('en-US') }</span> km<sup>2</sup></p>
            </div>
          </div>
          <div>
            <a href={data?.maps.googleMaps} className="leading-10 hover:text-[#d4d1d1]">Google Maps <i className="bi bi-box-arrow-up-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail