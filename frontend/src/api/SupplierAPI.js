import callAPI from './CallAPI';


function SupplierAPI() {

    // [GET] 
    this.suppliersList = () => {
        return callAPI.get('suppliers');
    }

    // [GET]
    this.supplierItem = (id) => {
        return callAPI.get(`suppliers/${id}`);
    }

    // [POST]
    this.createSupplier = (supplier) => {
        return callAPI.post('suppliers', supplier)
    }

    // [PUT]
    this.updateSupplier = (id, supplier) => {
        return callAPI.put(`suppliers/${id}`, supplier)
    }

    // [DELETE]
    this.deleteSupplier = (id) => {
        return callAPI.delete(`suppliers/${id}`)
    }



    //[GET] - [Order_Supplier]
    this.ordersBySupplier = (id) => {
        return callAPI.get(`suppliers/${id}/orders`);
    }

}
export default new SupplierAPI();
