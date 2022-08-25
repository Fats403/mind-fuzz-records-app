const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createProductStripe = async ({
  price,
  description,
  image,
  title,
}) => {
  let product;

  try {
    product = await stripe.products.create({
      name: title,
      description,
      default_price_data: {
        unit_amount: Math.round(price * 100),
        currency: "cad",
      },
      images: [image],
      expand: ["default_price"],
    });
  } catch (e) {
    throw new Error(e.message);
  }

  return product;
};

export const updateProductStripe = async (
  id,
  oldProduct,
  { description, image, title, price }
) => {
  let product, newPrice;

  const data = {
    name: title,
    description,
    images: [image],
  };

  // if the price changed, create new price and archive old one
  if (oldProduct.price !== price) {
    try {
      product = await stripe.products.retrieve(id);
    } catch (e) {
      throw new Error(e.message);
    }

    try {
      newPrice = await stripe.prices.create({
        unit_amount: Math.round(price * 100),
        currency: "cad",
        product: product.id,
      });
    } catch (e) {
      throw new Error(e.message);
    }

    data.default_price = newPrice.id;
  }

  try {
    await stripe.products.update(id, data);
  } catch (e) {
    throw new Error(e.message);
  }

  if (newPrice && product) {
    try {
      product = await stripe.prices.update(product.default_price, {
        active: false,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return product;
};

export const deleteProductStripe = async (id) => {
  try {
    await stripe.products.update(id, { active: false });
  } catch (e) {
    throw new Error(e.message);
  }

  return true;
};
