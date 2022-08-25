import createProduct from "../../../api/products/create";
import listProducts from "../../../api/products/list";
import apiHandler from "../../../utils/api/apiHandler";

export default apiHandler({
  post: createProduct,
  get: listProducts,
});
