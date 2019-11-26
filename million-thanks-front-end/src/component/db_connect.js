export function add(data) {
    console.log(data["customer_name"])
        // fetch("http://localhost:3200/addcustomer?name=" + data['customer_name']
        //                                 + '&street=' + data['customer_street']
        //                                 + '&city=' + data['customer_city']
        //                                 + '&state=' + data['customer_state']
        //                                 + '&zip=' + data['customer_zip']
        //                                 + '&longitude=' + data['customer_longitude']
        //                                 + '&latitude=' + data['customer_latitude']);
        fetch("http://localhost:3200/addcustomer?name=" + data['customer_name']
                                        + '&street=' + data['customer_street']
                                        + '&city=' + data['customer_city']
                                        + '&state=' + data['customer_state']
                                        + '&zip=' + data['customer_zip']
                                        + '&longitude=' + data['customer_longitude']
                                        + '&latitude=' + data['customer_latitude']);
}