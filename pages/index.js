import Head from "next/head"
import axios from "axios";
import {BsSearch} from 'react-icons/bs';
import { useState } from "react";
import Image from "next/image";
import Weather from "@/components/Weather";
import Spinner from "../components/Spinner"
export default function Home() {
  const [city,setCity]=useState('');
  const[weather,setWeather]=useState({});
  const [loading,setLoading]=useState(false);
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  const fetchWeather =(e) =>{
    e.preventDefault();
    setLoading(true);
    axios.get(API_URL).then((response)=>{
      setWeather(response.data)
    })
    setCity('')
    setLoading(false)
  }
  if(loading){
    return <Spinner/>
  }else{
    return (
      <div>
        <Head>
          <meta charset="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Weather Application</title>
        </Head>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>
        <Image src='https://images.unsplash.com/photo-1519121674122-e8613de6bc6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80' 
        layout='fill'
        className="object-cover"
        alt="background"
        />
        {/* {Search} */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
            <div>
              <input onChange={(e)=>(
                setCity(e.target.value)
              )} className="bg-transparent border-none text-white focus:outline-none text=3xl placeholder:text-white" type="text" placeholder="Search city"/>
            </div>
            <button onClick={fetchWeather}><BsSearch size={30}/></button>
          </form>
        </div>
        {/* {Weather} */}
        {weather.main && <Weather data={weather}/>}
  
      </div>
    )
  }

}
