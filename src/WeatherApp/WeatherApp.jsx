import React, { useState } from "react"
import "./WeatherApp.css"


//import images
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import deizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import thunderstrom_icon from "../assets/thunderstorm.png"
import snow_icon from "../assets/snow.png";
import mist_icon from "../assets/fog.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";


//Weather App function

export default function WeatherApp() {
    let api_key = "997d04f1a885bd5684bf3d5afdce203f"; // api from openWeatherMap

    //we are getting hold of icon using use state we are giving wicon value of cloud icon here
    const [wicon, setwicon] = useState(cloud_icon)
    
    // we use arrow function in search and make it an async function to fetch data from the api
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        //checking if the input field is empty or not 
        if (element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}` //``used to insert data in url example also added &units-Metric to get the temp in °C
        // fetching data
        let response = await fetch(url);  // await is used to wait for few sec to get data
        let data = await response.json(); // converting data from response to json unig json function
        
        //getting hold of elements by class to change the inner html elements
        const humidity = document.getElementsByClassName("humidity-percent") 
        const wind = document.getElementsByClassName("wind-rate")
        const temprature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        //updatind the inner html
        humidity[0].innerHTML = data.main.humidity +" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) +" °C";
        location[0].innerHTML = data.name;
        
        //updating wicon in realtime
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") { 
            setwicon(clear_icon)
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setwicon(cloud_icon)
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setwicon(deizzle_icon)
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setwicon(deizzle_icon)
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setwicon(rain_icon)
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setwicon(rain_icon)
        }
        else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
            setwicon(thunderstrom_icon)
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setwicon(snow_icon)
        }
        else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
            setwicon(mist_icon)
        }
        else {
            setwicon(clear_icon)
        }
        



    }
    
    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon">
                    <img src={search_icon} onClick={()=>{search()}} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}