const apiKey = '511e5455d1104c438e970429241107';

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`; // Updated to HTTPS
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            changeBackground(data.current.condition.text);
            printLocation(data.location);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    if (data.location) {
        document.getElementById('weather-description').textContent = `Weather: ${data.current.condition.text}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c} °C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    } else {
        alert('Location not found');
    }
}

function changeBackground(weatherCondition) {
    const body = document.body;
    body.className = ''; // Reset class

    if (weatherCondition.toLowerCase().includes('rain')) {
        body.classList.add('rainy');
    } else if (weatherCondition.toLowerCase().includes('cloud')) {
        body.classList.add('cloudy');
    } else if (weatherCondition.toLowerCase().includes('snow')) {
        body.classList.add('snowy');
    } else {
        body.classList.add('sunny');
    }
}

function printLocation(location) {
    const locationInfo = `Location: ${location.name}, ${location.region}, ${location.country}`;
    const locationElement = document.getElementById('location-info');
    if (locationElement) {
        locationElement.textContent = locationInfo;
    } else {
        const newLocationElement = document.createElement('p');
        newLocationElement.id = 'location-info';
        newLocationElement.textContent = locationInfo;
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.insertBefore(newLocationElement, weatherInfo.firstChild);
    }
}

// Optional: Use Geolocation API to get the user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`; // Updated to HTTPS
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                changeBackground(data.current.condition.text);
                printLocation(data.location);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });
}

