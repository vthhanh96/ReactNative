let rootURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

exports.getAddress = function(lat, long){
    let url = `${rootURL}${lat},${long}`;
    console.log(url);

    return fetch(url)
        .then((resp)=>resp.json())
        .then((json)=>{
            console.log(json.results.length);
            if(json.results.length === 0) {
                return '';
            }
            return json.results[0].formatted_address;
        });
}