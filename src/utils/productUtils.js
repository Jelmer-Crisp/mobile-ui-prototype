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

const DEFAULT_QUANTITY_TWO_CATEGORIES = ['Milk', 'Vegetables'];
const MULTI_PRODUCT_CATEGORIES = ['Snacks', 'Sweets', 'Fruits', 'Bread'];

export const addProduct = (products, productName, category) => {
  const lastIndex = findLastProductIndexForCategory(products, category);
  const defaultQuantity = DEFAULT_QUANTITY_TWO_CATEGORIES.includes(category) ? 2 : 1;
  const newProduct = { name: productName, category, quantity: defaultQuantity };
  
  if (MULTI_PRODUCT_CATEGORIES.includes(category)) {
    // For multi-product categories, add two different products
    const categoryProducts = require('../data/groceryData').categoryProducts[category];
    const availableProducts = categoryProducts.filter(p => p !== productName);
    const secondProduct = availableProducts[0]; // Get the first different product
    const secondNewProduct = { name: secondProduct, category, quantity: 1 };
    
    if (lastIndex === -1) {
      // No products from this category yet, add both to end
      return [...products, newProduct, secondNewProduct];
    } else {
      // Insert both after the last product of the same category
      const newProducts = [...products];
      newProducts.splice(lastIndex + 1, 0, newProduct, secondNewProduct);
      return newProducts;
    }
  } else {
    if (lastIndex === -1) {
      // No products from this category yet, add to end
      return [...products, newProduct];
    } else {
      // Insert after the last product of the same category
      const newProducts = [...products];
      newProducts.splice(lastIndex + 1, 0, newProduct);
      return newProducts;
    }
  }
};
