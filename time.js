

    const ciudad = 'Guadalajara';
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
       
        const timeZoneLocal = (new Date().getTimezoneOffset()*60000) +  (new Date().getTime());
        const horaDeCiudad = timeZoneLocal + data.timezone * 1000;
        const fechaImprimir = new Date(horaDeCiudad).toLocaleString();

        const fechaCiudad = new Date(data.timezone * 1000+(new Date().getTime())).toUTCString();
        
        console.log(fechaImprimir);
        console.log(fechaCiudad);
    });
