//World countries and their bordering countries - https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;borders;
//EU countries - https://restcountries.eu/rest/v2/regionalbloc/eu?fields=name;alpha2Code;borders;
const eu =  "region/europe"
const world = "all"
const africa = "region/africa"

const restCountriesURL = "https://restcountries.eu/rest/v2/"
const nameCodeBorders = "?fields=name;alpha3Code;borders;"

async function fetchAPI(region) {
    const response = await fetch(restCountriesURL + region + nameCodeBorders);
    const myJSON = await response.json();
    return myJSON;
}

function countries() {
    const getEUCountries = async () => {
        return await fetchAPI(eu)
    }

    const getWorldCountries = async () => {
        return await fetchAPI(world)
    }

    const getAfricaCountries = async () => {
        return await fetchAPI(africa)
    }

    return {
        getEUCountries,
        getWorldCountries,
        getAfricaCountries
    }
}
export default countries;