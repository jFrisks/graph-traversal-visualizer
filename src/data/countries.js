//World countries and their bordering countries - https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;borders;
//EU countries - https://restcountries.eu/rest/v2/regionalbloc/eu?fields=name;alpha2Code;borders;



async function fetchAPI(apiURL) {
    const response = await fetch(apiURL);
    const myJSON = await response.json();
    return myJSON;
}

function countries() {
    const getEUCountries = async () => {
        return await fetchAPI("https://restcountries.eu/rest/v2/regionalbloc/eu?fields=name;alpha3Code;borders;")
    }

    return {
        getEUCountries
    }
}
export default countries;