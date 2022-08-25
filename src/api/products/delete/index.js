import {
  deleteProductFirebase,
  getProductFirebase,
} from "../../../services/firebase/admin";
import { deleteProductStripe } from "../../../services/stripe";
import withAuth from "../../../utils/api/middlewares/withAuth";

const handler = async (req, res) => {
  let product;

  try {
    product = await getProductFirebase(req.query.id);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  try {
    await deleteProductStripe(product.stripeProductId);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  try {
    await deleteProductFirebase(product.id);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  return res.status(200).json({ success: true });
};

export default withAuth(handler, "admin");
