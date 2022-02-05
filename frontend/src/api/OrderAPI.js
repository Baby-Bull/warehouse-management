import callAPI from './CallAPI';


function OrderAPI() {

    // [GET] /
    this.OrderList = () => {
        return callAPI.get('orders');
    }

    // [GET]
    this.OrderItem = (data) =>{
        return callAPI.get(`orders/${data}`);
    }

    // [POST]
    this.createOrder = (data) => {
        return callAPI.post('orders/', data)
    }

    // [PUT]
    this.updateOrder = (id, data) => {
        return callAPI.put(`orders/${id}`,data)
    }

    this.deleteOrder = (id) => {
        return callAPI.delete(`orders/${id}`);
      };
    
    this.VariantOrder = (data) => {
        // return callAPI.get(`variants/variantOrder/${data}`)
        return callAPI.get(`orders/${data}/variants`);
    }

}
export default new OrderAPI();