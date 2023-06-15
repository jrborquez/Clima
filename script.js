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
        const horaDeCiudad = (new Date().getTimezoneOffset()*60000) + (new Date().getTime()) + data.timezone * 1000;

        fila.insertCell().innerHTML = data.name;
        fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML = data.weather[0].description;
        fila.insertCell().innerHTML = new Date(horaDeCiudad).toLocaleString();
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
            
            fila.insertCell().innerHTML = ciudad.name;
            fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = ciudad.weather[0].description;
            fila.insertCell().innerHTML = new Date(ciudad.timezone * 1000+(new Date().getTime())).toUTCString();
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
