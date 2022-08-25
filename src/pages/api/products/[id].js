import deleteProduct from "../../../api/products/delete";
import updateProduct from "../../../api/products/update";
import apiHandler from "../../../utils/api/apiHandler";

export default apiHandler({
  delete: deleteProduct,
  post: updateProduct,
});
