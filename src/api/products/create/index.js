import { createProductFirebase } from "../../../services/firebase/admin";
import { createProductStripe } from "../../../services/stripe";
import withAuth from "../../../utils/api/middlewares/withAuth";
import withValidation from "../../../utils/api/middlewares/withValidation";
import createProductSchema from "./schema";

const handler = async (req, res) => {
  let stripeProduct, product;

  try {
    stripeProduct = await createProductStripe(req.data);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  try {
    product = await createProductFirebase(req.data, stripeProduct.id);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  return res.status(201).json({ product });
};

export default withValidation(withAuth(handler, "admin"), createProductSchema);
