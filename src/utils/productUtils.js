export const isProductSelected = (products, productName, category) => {
  return products.some(p => p.name === productName && p.category === category);
};

export const findLastProductIndexForCategory = (products, category) => {
  for (let i = products.length - 1; i >= 0; i--) {
    if (products[i].category === category) {
      return i;
    }
  }
  return -1;
};

export const addProduct = (products, productName, category) => {
  const lastIndex = findLastProductIndexForCategory(products, category);
  const newProduct = { name: productName, category };
  
  if (lastIndex === -1) {
    // No products from this category yet, add to end
    return [...products, newProduct];
  } else {
    // Insert after the last product of the same category
    const newProducts = [...products];
    newProducts.splice(lastIndex + 1, 0, newProduct);
    return newProducts;
  }
};
