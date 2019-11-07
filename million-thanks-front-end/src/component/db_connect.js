
export function addCustomer(name, street, city, state, zip) {
    fetch("http://localhost:3200/addcustomer?name=" + name 
                                    + "&street=" + street
                                    + "&city=" + city
                                    + "&state=" + state
                                    + "&zip=" + zip);
}

export function search(filter, text) {
    fetch("http://localhost:3200/" + filter + "?text=" + text);
}
