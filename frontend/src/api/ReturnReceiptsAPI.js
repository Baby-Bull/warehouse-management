import callAPI from "./CallAPI";

function ReturnReceiptsAPI() {
  // [GET] /
  this.Return = (orderId, data) => {
    return callAPI.post(`orders/${orderId}/return-receipts`, data);
  };
  this.HistoryReturn = (orderId) => {
    return callAPI.get(`orders/${orderId}/return-receipts`);
  }
}
export default new ReturnReceiptsAPI();