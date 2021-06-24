import axios from 'axios';

export class ProductService{

    //path API
    url = "https://test-fractal.herokuapp.com/api/product";


    //Metod all orders
    getAll(){
        return axios.get(this.url + "/all").then(
            res => res.data
        );
    }

    //Metod save order
    save(product){
        return axios.post(this.url + "/save", product).then(
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