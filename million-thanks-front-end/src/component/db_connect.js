export function add(data) {
    console.log(data[0]["customer_name"])
    console.log(data.length)
    for (let i = 0; i < data.length; ++i)
        // fetch("http://localhost:3200/addcustomer?name=" + data['customer_name']
        //                                 + '&street=' + data['customer_street']
        //                                 + '&city=' + data['customer_city']
        //                                 + '&state=' + data['customer_state']
        //                                 + '&zip=' + data['customer_zip']
        //                                 + '&longitude=' + data['customer_longitude']
        //                                 + '&latitude=' + data['customer_latitude']);
        fetch("http://localhost:3200/addcustomer?name=" + data[i]['customer_name']
                                        + '&street=' + data[i]['customer_street']
                                        + '&city=' + data[i]['customer_city']
                                        + '&state=' + data[i]['customer_state']
                                        + '&zip=' + data[i]['customer_zip']
                                        + '&longitude=' + data[i]['customer_longitude']
                                        + '&latitude=' + data[i]['customer_latitude']);
}