import callAPI from './CallAPI';


function VariantAPI() {

  //PRODUCT
  // [GET] /
  this.variantsList = () => {
    return callAPI.get("variants");
  };
  // [GET] /
  this.variants = (id) => {
    return callAPI.get(`variants/${id}`);
  };
  // [POST] /
  this.createVariant = (data) => {
    return callAPI.post(`variants`, data);
  };
  // [PUT] /
  this.updateVariant = (id, data) => {
    return callAPI.put(`variants/${id}`, data);
  };
  // [DELETE] /
  this.deleteVariant = (id) => {
    return callAPI.delete(`variants/${id}`);
  };
  

  //VARIANT
  // [GET] /
  this.variantList = (id) => {
    return callAPI.get(`variants/${id}/variants`);
  };
  // [GET] /
  this.getAllVariants = () => {
    return callAPI.get(`variants`);
  };
  // [GET] /
  this.getLatestVariantCode = () => {
    return callAPI.get(`variants/get-lastest-variant-code`);
  };
  // [POST] /
  this.createVariant = (data) => {
    return callAPI.post(`variants`, data);
  };
  // [put] /
  this.updateVariant = (id,data) => {
    return callAPI.put(`variants/${id}`, data);
  };
  // [DELETE] /
  this.deleteVariant = (id) => {
    return callAPI.delete(`variants/${id}`);
  };
}
export default new VariantAPI();
