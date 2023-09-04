

const { inquirerMenu, pausa, leerInput, listPlaces } = require("./helpers/inquirerMenu");
const Search = require('./models/busquedas');
const searches = new Search();

const main = async () => {
    console.clear();

    let opt = 0;

    do {
        console.clear();
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                console.clear();
                const place = await leerInput("Escriba la ciudad que desea buscar: ");
                const places = await searches.city(place);
                const id = await listPlaces(places);
                if(id ==='0') continue;
                const placeSelect = places.find(p => p.id === id)
                searches.addHistory(placeSelect?.name)

                const responseWeather = await searches.weather(placeSelect?.lat, placeSelect?.lng)
                const tempDetail = responseWeather?.data?.main;
                console.log('\n informaticion '.green);
                console.log('Ciudad: ', placeSelect?.name);
                console.log('Lat: ', placeSelect?.lat);
                console.log('Lng: ', placeSelect?.lng);
                console.log('Temperatura c°: ', tempDetail?.temp);
                console.log('Minima: ', tempDetail?.temp_min);
                console.log('Maxima: ', tempDetail?.temp_max);
                break;

            case 2:
            searches.history.forEach((place, i)=>{
                const idx =`${i+1}`.green;
                console.log(`${idx} ${place}`);
            })
            break;

        }
        await pausa();
    } while (opt !== 0);
};

main();
