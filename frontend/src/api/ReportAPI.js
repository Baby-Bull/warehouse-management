import callAPI from './CallAPI';

function ReportAPI() {

    //[GET] get totals supplied quantity 
    this.totalSuppliedQuantity = (year) => {
        return callAPI.get(`report/total-supplied-quantity?year=${year}`);
    }

    //[GET] get total orders 
    this.totalOrders = (year) => {
        return callAPI.get(`report/total-orders?year=${year}`)
    }

    // [GET] get all each month
    this.eachMonth = (year) => {
        return callAPI.get(`report/each-month?year=${year}`)
    }
}
export default new ReportAPI();