
require('dotenv').config()
const { readInput, inquirerMenu, inquirerPause, listPlaces } = require("./helpers/inquirer");
const Searches = require("./model/searches");
require('colors');


console.log('Welcome to the jungle');

const main = async() => {
 
let option = 0;
const searches = new Searches();
 do 
 {
    /* Show menu */
    option = await inquirerMenu();
    
    switch (option) {
        case 1:
        /* Show msj */
        const input = await readInput('City: ');
        /* Search places */
        const places = await searches.city(input);
        /* Select places */
        const id = await listPlaces(places);
        if (id === '0') continue;
        const selectPlace = places.find(value => value.id === id);
        searches.addHistory(selectPlace.name)
        /* Weather */
        const weather = await  searches.weatherPlace(selectPlace.lat, selectPlace.lng);
        /* Show results */
        console.clear();
        console.log('\nCity information\n'.blue);
        console.log('City:', selectPlace.name.blue);
        console.log('Lat:', selectPlace.lat );
        console.log('Lng:', selectPlace.lng );
        console.log('Temp:', weather.temp );
        console.log('Min:', weather.min);
        console.log('Max:', weather.max);
        console.log('Desc:', weather.desc.blue);
            
        break;
        case 2:
        searches.historyCapital.forEach((value, index) =>{
            const i = `${index + 1}.`.green
            console.log( i + value);
        });
        break;
    }

    /* Pause menu */
    if(option !== 0) await inquirerPause();
 } 
 while (option !== 0);
}

main();