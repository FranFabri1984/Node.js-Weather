const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapital() {
        return this.history.map(value => {
            let words = value.split(' ');
            words = words.map(w => 
              w[0].toUpperCase() + w.substring(1));
            return words.join(' ');
            
        })
    }

    get paramsMapbox() {
        return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'language': 'es'
        }
    }

    get paramsWeather() {
        return {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        }
    }

    async city(place = '') {
        try 
        {
            /* Http request */
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
                params: this.paramsMapbox
            });

            const response = await instance.get();
            return response.data.features.map(value => ({
                id: value.id,
                name: value.place_name,
                lng: value.center[0],
                lat: value.center[1],
            }));  
        } 
        catch (error) 
        {
            return [];
        }
        
    }

    async weatherPlace(lat, lon) {
        try 
        {
             /* Http request */
             const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            });

            const response = await instance.get();
            const {weather, main} = response.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };  
        } 
        catch (error) {
            console.log(error);
        }

    }

    addHistory(place = '') {
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        this.history.unshift(place.toLocaleLowerCase());

        this.saveDB();
    }

    saveDB() {
        const payload = { history: this.history};
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
      if (!fs.existsSync(this.dbPath)) {
        return;
      }  
      const info =  fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
      const data = JSON.parse(info);
      this.history = data.history;
    }

}

module.exports = Searches;