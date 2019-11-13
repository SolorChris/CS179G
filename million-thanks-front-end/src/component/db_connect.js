
export function add(name, street, city, state, zip) {
    fetch("http://localhost:3200/addcustomer?name=" + name 
                                    + "&street=" + street
                                    + "&city=" + city
                                    + "&state=" + state
                                    + "&zip=" + zip);
}

export function search(filter, text) {
    if(text) {
        return fetch("http://localhost:3200/search?text=" + text + "&filter=" + filter)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            return data;
        })
    }
}
