import {
  getProductFirebase,
  updateProductFirebase,
} from "../../../services/firebase/admin";
import { updateProductStripe } from "../../../services/stripe";
import withAuth from "../../../utils/api/middlewares/withAuth";
import withValidation from "../../../utils/api/middlewares/withValidation";
import updateProductSchema from "./schema";

const handler = async (req, res) => {
  let product, oldProduct;

  try {
    oldProduct = await getProductFirebase(req.query.id);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  try {
    product = await updateProductFirebase(req.query.id, req.data);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  try {
    await updateProductStripe(product.stripeProductId, oldProduct, req.data);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  return res.status(201).json({ product });
};

export default withValidation(withAuth(handler, "admin"), updateProductSchema);
