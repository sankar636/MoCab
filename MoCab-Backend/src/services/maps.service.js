/*
Here we have to use 3 services to get 
(1) Address (i.e latitude and longitude)
(2) Distance between two address
*/

import axios from "axios";

const apikey = process.env.GOOGLE_MAPS_API;

// Get coordinates from address
const getAddressCoordinate = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
            address,
            key: apikey
        }
    });

    const results = response.data.results;
    if (results.length > 0) {
        return results[0].geometry.location; // { lat, lng }
    }

    return null;
};

// Get distance and time between two places
const getDistanceTime = async (origin, destination) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
        params: {
            origins: origin,
            destinations: destination,
            key: apikey
        }
    });

    const result = response.data.rows[0].elements[0];
    if (result.status === "OK") {
        console.log("Distance",result.distance.text);
        console.log("Duration",result.duration.text);
        
        return {
            distance: result.distance.text,
            duration: result.duration.text
        };
    }

    return null;
};

const autoCompleteSuggession = async (input) => {
    const apiKey = process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: apiKey
            }
        });
        // console.log("Response for auto complete suggession", response.data);
        
        if (response.data.status === 'OK') {
            return response.data.predictions
                .map(prediction => prediction.description)
                .filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

}

const captainInTheRadious = async (lat, lng, radiou) => {
    // find captain(driver) within 5 Km radius
    
}

export {
    getAddressCoordinate,
    getDistanceTime,
    autoCompleteSuggession,
    captainInTheRadious
};


/*
const origin = 'New York, NY';
const destination = 'Los Angeles, CA';
const apiKey = 'YOUR_API_KEY';

const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

axios.get(url, {
  params: {
    origins: origin,
    destinations: destination,
    key: apiKey
  }
}).then(response => {
  const data = response.data;
  const distance = data.rows[0].elements[0].distance.text;
  const duration = data.rows[0].elements[0].duration.text;
  console.log(`Distance: ${distance}, Duration: ${duration}`);
}).catch(error => {
  console.error('Error fetching distance:', error.message);
});
*/