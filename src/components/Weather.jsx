import { useEffect, useState } from "react"

const Weather = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    function handleChange(event) {
        setCity(event.target.value);
    }

    const apiKey = '793e5fa3eea08c66d4fb3a21b03672d6';

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    async function handleSearch() {
        setLoading(true);
        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setWeatherData(data);

        } catch (error) {

            console.log("Error while fetching data:", error)
            setWeatherData(null);

        } finally {

            setLoading(false);

        }


    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    function success(pos) {
        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        setLongitude(crd.longitude);
        setLatitude(crd.latitude);
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    console.log(result)
                    if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    }
                    if (result.state === "granted"){
                        navigator.geolocation.getCurrentPosition(success,errors,options);
                    }
                    if (result.state === "denied"){
                        alert("Please turn on location services for it to use current location service.")
                        navigator.geolocation.getCurrentPosition(success,errors,options);
                    }
                })
        } else {
            alert("Geolocation is not supported in your browser.")
        }
    }, [])

    function handleLocation(){
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        handleSearch();
    }

    return (
        <>
            <div className=' p-4 rounded bg-success d-flex flex-column align-items-center'>
                <h1 className='text-white'>This is Weather App 1</h1>
                <div className="input-group w-50">
                    <button className="btn btn-primary p-2 input-group-text" onClick={handleLocation}>Current Location</button>
                    <input type="text" className='form-control' placeholder='City Name' onChange={handleChange} onKeyDown={handleKeyDown} />
                    <button className="btn btn-danger p-2 input-group-text" onClick={handleSearch}>Search</button>
                </div>
                {loading && <p className="text-white">Loading...</p>}
                {weatherData &&
                    <div className="text-white mt-3 bg-info bg-gradient w-25 rounded">
                        <h2>{weatherData.name}</h2>
                        <p>{weatherData.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                        <p className="text fs-1">{(weatherData.main.temp - 273).toFixed(2)} °</p>
                        <p>{weatherData.main.humidity} g/m3</p>

                    </div>
                }
            </div>
        </>
    );
};
export default Weather;