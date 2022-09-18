const { raw } = require("express");

function productBarAll(rawProductData) {
  const productsData = rawProductData.map(({ dataValues }) => ({
    ...dataValues,
  }));
  return productsData.map((product) => ({
    ...product,
    tags: product.tags.map(({ id, tag_name }) => ({ id, tag_name })),
  }));
}

function productBarOne(rawProductData) {
  const serializedTags = rawProductData.tags.map(({ id, tag_name }) => ({
    id,
    tag_name,
  }));
  const returnProduct = {
    id: rawProductData.id,
    product_name: rawProductData.product_name,
    price: rawProductData.price,
    stock: rawProductData.stock,
    category: rawProductData.category,
    tags: serializedTags,
  };

  return returnProduct;
}

module.exports = { productBarAll, productBarOne };
