import callAPI from "./CallAPI";

function CategoryAPI() {
  // [GET] /
  this.CategoryList = () => {
    return callAPI.get("categories");
  };
  // [POST] /
  this.CreateCategory = (data) => {
    return callAPI.post("categories", data);
  };
  // [UPDATE] /
  this.UpdateCategory = (id ,data) => {
    return callAPI.update(`categories/${id}`, data);
  };
  // [DELETE] /
  this.DeleteCategory = (id) => {
    return callAPI.delete(`categories/${id}`);
  };
}
export default new CategoryAPI();