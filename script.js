function consultarClima(){
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;

    fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Error en la respuesta de la API');
        }
    })
    .then(data =>{
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        const fila = tabla.insertRow();
        const elTimezone = data.timezone;
        const dateTime = new Date(data.dt * 1000);
        const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
        const currentLocalTime = toUtc + 1000 * elTimezone;
        const selectedDate = new Date(currentLocalTime).toLocaleString('es-MX',{dateStyle:'short', timeStyle:'short'});

        fila.insertCell().innerHTML = data.name;
        fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML = data.weather[0].description;
        fila.insertCell().innerHTML = selectedDate;
    });
};


function consultarClimas(){
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';
    
    Promise.all(ciudades.map(ciudad=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;
        
        return fetch(url).then(response =>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Error en la respuesta de la API');
            }
        })
    }))
    .then(data=>{
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad => {
            const fila = tabla.insertRow();
            const timeZone = data.timezone * 1000;
            const dateTime = new Date(data.dt * 1000);
            const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
            const currentLocalTime = toUtc + timeZone;
            const selectedDate = new Date(currentLocalTime).toLocaleString('es-MX',{dateStyle:'short', timeStyle:'short'});
            
            fila.insertCell().innerHTML = ciudad.name;
            fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = ciudad.weather[0].description;
            fila.insertCell().innerHTML = selectedDate;
        });
    })
    .catch(error=>{
        alert('Error al consultar el clima', error);
    });
    
};

function limpiarTabla(){
    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for(let i = 0; i<tabla.length; i++)
    {
        tabla[i].innerHTML = '';
    }
};
