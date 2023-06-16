
/* 
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
    }); */

    function consultarClima(){
        const ciudad = Guadalajara;
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
            var horaDeCiudad = new Date((new Date().getTimezoneOffset()*60000) + (new Date().getTime()) + data.timezone * 1000).toLocaleString('es-MX', {timeStyle: 'medium'});
    
            fila.insertCell().innerHTML = data.name;
            fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = data.weather[0].description;
            fila.insertCell().innerHTML = horaDeCiudad;
        });h
    };

    function mueveReloj(){ 
        let horaDeCiudad =  this.horaDeCiudad;
        hora = horaDeCiudad.getHours(); 
        minuto = horaDeCiudad.getMinutes(); 
        segundo = horaDeCiudad.getSeconds(); 
    
        horaImprimible = hora + " : " + minuto + " : " + segundo; 
    
        
        document.table.horaLocal.value = this.horaDeCiudad;
    
        //La función se tendrá que llamar así misma para que sea dinámica, 
        //de esta forma:
    
        setTimeout(mueveReloj,1000);
    }


    consultarClima();






    var horaDeCiudad = new Date((new Date().getTimezoneOffset()*60000) + (new Date().getTime()) + data.timezone * 1000);

    function mueveReloj(){ 
        let horaDeCiudad =  this.horaDeCiudad;
        
        document.table.horaLocal.value = horaDeCiudad.toLocaleString('es-MX', {timeStyle: 'medium'});
    
        setTimeout(mueveReloj,1000);
    };

