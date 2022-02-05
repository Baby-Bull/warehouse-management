import callAPI from "./CallAPI";

function ImportReceiptsAPI() {
  // [GET] /
  this.Import = (orderId, data) => {
    return callAPI.post(`orders/${orderId}/import-receipts`, data);
  };
  this.HistoryImport = (orderId) => {
    return callAPI.get(`orders/${orderId}/import-receipts`);
  }
}
export default new ImportReceiptsAPI();