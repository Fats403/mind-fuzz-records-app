import { listProductsFirebase } from "../../../services/firebase/admin";

const handler = async (req, res) => {
  let products;

  try {
    products = await listProductsFirebase();
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  return res.status(200).json({ products });
};

export default handler;
