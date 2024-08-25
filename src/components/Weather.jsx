import { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    function handleChange(event) {
        setCity(event.target.value);
    }

    const apiKey = '793e5fa3eea08c66d4fb3a21b03672d6';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    async function handleSearch() {
        setLoading(true);
        const response = await fetch(url);

        const data = await response.json();

        setWeatherData(data);
        setLoading(false);
    };

    function handleKeyDown(event){
        if (event.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <>
            <div className='container p-4 rounded bg-success'>
                <h1 className='text-white'>This is Weather App 1</h1>
                <div className="">
                    <input type="text" className='rounded p-2' placeholder='City Name' onChange={handleChange} onKeyDown={handleKeyDown}/>
                    <button className="btn btn-danger p-2" onClick={handleSearch}>Search</button>
                </div>
                {loading && <p className="text-white">Loading...</p>}
                {weatherData &&
                    <div className="text-white mt-3">
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {(weatherData.main.temp -273).toFixed(2)}</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                    </div>
                }
            </div>
        </>
    );
};
export default Weather;