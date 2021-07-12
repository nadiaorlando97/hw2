/*Meteo
L'API che ho utilizzato mi permette di interfacciarmi con un servizio chiamato "OpenWeather", 
il quale fornisce informazioni relative al meteo e per il quale è prevista un'autenticazione con API key
che ho ottenuto registrandomi al servizio.
La richiesta è HTTP GET e la risposta è in formato json.
Nella richiesta HTTP oltre ad inserire la chiave di autenticazione, ho inserito anche la città di cui
desidero avere le informazioni meteo. In questo caso ho scelto come città Catania.
Nel json, quindi, arriveranno solo le informazioni relative al meteo di Catania 
che poi mostro all'interno dell'interfaccia.
Per rendere più comprensibili i dati del json, li ho tradotti in Italiano e formattati in modo corretto.
*/
function inforMeteoCatania(){
    const citta = 'catania';
    /* console.log('Partita informeteo');
    console.log(citta); */
    const URL = "home/meteo_api/"+citta;
    fetch(URL).then(onResponseMeteo).then(onJsonMeteo);
}


function inforMeteo() {
    const citta = document.getElementById('ricercaMeteo').value;
    /* console.log('Partita informeteo');
    console.log(citta); */
    const URL = "home/meteo_api/"+citta;
    fetch(URL).then(onResponseMeteo).then(onJsonMeteo);
}

function onResponseMeteo(response) {
    /* console.log(response); */
    return response.json();
}

function onJsonMeteo(json) {
    /* console.log(json); */

    const sectionMeteo = document.getElementById("sectionMeteo");
    sectionMeteo.classList.remove('hidden');
    sectionMeteo.classList.add('visible');

    const main = json.main;
    const infoMain = document.getElementById("infoMain");
    const el = document.getElementById('divInfoM');

    if(el != null) {
        el.remove();
    }

    const divInfoM = document.createElement('div');
    divInfoM.id="divInfoM";
    const elementoM = document.createElement('h1');
    elementoM.textContent = "Meteo "+json['name'];
    divInfoM.appendChild(elementoM);
    for(info in main) {
        const elementoM = document.createElement('h2');

        if(info == 'humidity') {
            elementoM.textContent = 'Umidità' + ': ' + json.main[info];
        }
        if(info == 'pressure') {
            elementoM.textContent = 'Pressione' + ': ' + json.main[info];
        }
        if(info == 'temp') {
            elementoM.textContent = 'Temperatura (K)' + ': ' + json.main[info];
        }
        if(info == 'temp_max') {
            elementoM.textContent = 'Temperatura Massima (K)' + ': ' + json.main[info];
        }
        if(info == 'temp_min') {
            elementoM.textContent = 'Temperatura Minima (K)' + ': ' + json.main[info];
        }
        divInfoM.appendChild(elementoM); 
    }
    infoMain.appendChild(divInfoM);
    const btnInfoMeteo = document.getElementById("btnInfoMeteo");
    btnInfoMeteo.removeEventListener('click',inforMeteoCatania);
    btnInfoMeteo.addEventListener('click',closeInfoMeteo);
}

function closeInfoMeteo() {
    const elementoM = document.getElementById('divInfoM');
    if(elementoM != null) {
        elementoM.remove();
    }
  
    const sectionMeteo = document.getElementById("sectionMeteo");
    sectionMeteo.classList.remove('visible');
    sectionMeteo.classList.add('hidden');
    
    const btnInfoMeteo = document.getElementById("btnInfoMeteo");
    btnInfoMeteo.removeEventListener('click',closeInfoMeteo);
    btnInfoMeteo.addEventListener('click',inforMeteoCatania);
}


//Bottone informazioni Meteo
const btnInfoMeteo = document.getElementById("btnInfoMeteo");
btnInfoMeteo.addEventListener('click',inforMeteoCatania);
const btnCercaInfoMeteo = document.getElementById('btnCercaInfoMeteo');
btnCercaInfoMeteo.addEventListener('click', inforMeteo);