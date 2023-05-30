const getLuisResponse = (utterance) => {
    const LUIS_URL = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/292c612f-1259-48a8-ab9e-5899080c0dae?verbose=true&timezoneOffset=0&subscription-key=8edb8b2894a444d9901ca260129a77b9&q=';

    return new Promise((resolve, reject) => {
        fetch(LUIS_URL + utterance)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // DO SOMETHING WITH THE DATA
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });

    });
}

export default getLuisResponse;