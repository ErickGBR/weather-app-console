const fs = require('fs');
const axios = require('axios');

const {
    base_url_maps,
    access_token,
    base_url_weather,
    api_token_weather
} = require("../config");

class Search {
    history = []
    dbPath = './db/database.json';
    
    constructor() {
        this.readDb();
    }

    get historyCap(){
        return this.history;
    }
    
    /**
     * Method for 
     * @param { string } placeName name of place, city, etc...
     * @returns {Array<>} return results of places
     */

    
    async city(placeName = "") {
        try {
            const place = encodeURIComponent(placeName)
            const baseUrl = `${base_url_maps}geocoding/v5/mapbox.places/${place}.json?access_token=${access_token}&limit=5`;
            const dataAxios = await axios.get(baseUrl);
            const resp = dataAxios.data;
            return resp.features.map(item =>({
                id: item.id,
                name: item.place_name,
                lng:item.center[0],
                lat:item.center[1]
            }))
            
        } catch (error) {
            console.log(error);
            return [];
        }

    }

    async weather(lat="", lon=""){
        try {
            const baseUrl = `${base_url_weather}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_token_weather}&units=metric`
            const dataWeather = await axios.get(baseUrl);
            return dataWeather;
        } catch (error) {
            console.log(error);
            return {}
        }
    }


    addHistory(place =''){
        if(this.history.includes(place.toLocaleLowerCase()))return;
        this.history.unshift(place.toLocaleLowerCase());
        this.saveDb();
        
    }

    saveDb(){
        const payload ={
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDb(){
        if(!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse(info)
        this.history = data.history;
    }
}

module.exports = Search;