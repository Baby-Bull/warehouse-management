import callAPI from "./CallAPI";

function Payment() {
  // [GET] /
  this.Paid = (orderId, data) => {
    return callAPI.post(`orders/${orderId}/payment-invoices`, data);
  };
  this.HistoryPaid = (orderId) => {
    return callAPI.get(`orders/${orderId}/payment-invoices`);
  }
}
export default new Payment();