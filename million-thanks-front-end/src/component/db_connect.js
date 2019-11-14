
export function add(name, street, city, state, zip) {
    fetch("http://localhost:3200/addcustomer?name=" + name 
                                    + "&street=" + street
                                    + "&city=" + city
                                    + "&state=" + state
                                    + "&zip=" + zip);
}

