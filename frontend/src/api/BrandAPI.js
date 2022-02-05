import callAPI from "./index";

function BrandAPI() {
  // [GET] /
  this.BrandList = () => {
    return callAPI.get("brands");
  };
}
export default new BrandAPI();