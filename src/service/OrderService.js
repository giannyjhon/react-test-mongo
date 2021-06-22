import axios from 'axios';

export class OrderService{

    //path API
    url = "http://localhost:8080/api/order";


    //Metod all orders
    getAll(){
        return axios.get(this.url + "/all").then(
            res => res.data
        );
    }

    //Metod save order
    save(order){
        return axios.post(this.url + "/save", order).then(
            res => res.data
        )
    }

    //Metod delete order
    delete(id){
        return axios.delete(this.url + "/delete/"+id).then(
            res => res.data
        )
    }
}