

    const ciudad = 'London';
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
        const dateGMT = new Date().getTime();
        const ciudadTimezone = data.timezone*1000; 
        const tiempoCiudad = new Date(ciudadTimezone).toUTCString();
        const tiempoCiudad2 = new Date(dateGMT).toLocaleString();
        const horaFinal = dateGMT+ciudadTimezone;
        const yaHora = new Date(dateGMT + ciudadTimezone).toLocaleString();
    
        console.log(dateGMT + ' son milisegundos');
        console.log(ciudadTimezone);
        console.log(tiempoCiudad);
        console.log(`ciudad 2 ${tiempoCiudad2}`);
        console.log(horaFinal);
        console.log(yaHora);
    });
