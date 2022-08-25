import * as firebaseAdmin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  });
}

const firestore = firebaseAdmin.firestore();

const getProductFirebase = async (id) => {
  const productRef = firestore.collection("products").doc(id);

  let product;
  try {
    product = (await productRef.get()).data();
  } catch (e) {
    throw new Error(e.message);
  }

  return product;
};

const listProductsFirebase = async () => {
  const productsRef = firestore.collection("products");

  let products;
  try {
    products = (await productsRef.get()).docs.map((p) => p.data());
  } catch (e) {
    throw new Error(e.message);
  }

  return products;
};

const createProductFirebase = async (params, stripeProductId) => {
  const productRef = firestore.collection("products").doc();

  const data = {
    stripeProductId,
    id: productRef.id,
    createdAt: Date.now(),
    ...params,
  };

  try {
    await productRef.set(data);
  } catch (e) {
    throw new Error(e.message);
  }

  return data;
};

const updateProductFirebase = async (id, params) => {
  const productRef = firestore.collection("products").doc(id);

  try {
    await productRef.set(params, { merge: true });
  } catch (e) {
    throw new Error(e.message);
  }

  return await getProductFirebase(id);
};

const deleteProductFirebase = async (id) => {
  const productRef = firestore.collection("products").doc(id);

  // TODO: delete storage assets associated to product
  // TODO: make sure to revamp how images get uploaded

  try {
    await productRef.delete();
  } catch (e) {
    throw new Error(e.message);
  }

  return true;
};

export {
  firebaseAdmin,
  createProductFirebase,
  getProductFirebase,
  listProductsFirebase,
  deleteProductFirebase,
  updateProductFirebase,
};
