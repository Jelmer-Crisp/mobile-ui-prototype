import React from 'react';
import { BottomPanel, PanelHeader, PanelTitle, CloseButton } from './styled';
import { 
  ProductTile, 
  ProductContent, 
  ProductEmoji, 
  ProductInfo, 
  ProductName, 
  CategoryLabel,
  QuantityControls,
  QuantityButton,
  QuantityDisplay
} from './styled';
import { productEmojis } from '../data/groceryData';
import { isProductSelected } from '../utils/productUtils';

const BottomOptionsPanel = ({ 
  isOpen, 
  currentCategory, 
  products, 
  categoryProducts, 
  onClose, 
  onProductToggle 
}) => {
  const getProductQuantity = (productName) => {
    const product = products.find(p => p.name === productName && p.category === currentCategory);
    return product ? product.quantity || 1 : 0;
  };

  const handleQuantityChange = (product, change) => {
    const quantity = getProductQuantity(product);
    if (quantity === 0 && change > 0) {
      // Initial add
      onProductToggle(product);
    } else if (quantity === 1 && change < 0) {
      // Remove when going from 1 to 0
      onProductToggle(product);
    } else {
      // Find the product index and update quantity
      const productIndex = products.findIndex(
        p => p.name === product && p.category === currentCategory
      );
      if (productIndex !== -1) {
        const newQuantity = quantity + change;
        if (newQuantity > 0) {
          const newProducts = [...products];
          newProducts[productIndex] = { 
            ...newProducts[productIndex], 
            quantity: newQuantity 
          };
          // Update products through onProductToggle
          onProductToggle(product, newQuantity);
        }
      }
    }
  };

  return (
    <BottomPanel $isOpen={isOpen}>
      <PanelHeader>
        <PanelTitle>{currentCategory} Options</PanelTitle>
        <CloseButton onClick={onClose}>
          <span className="material-icons">close</span>
        </CloseButton>
      </PanelHeader>
      
      {categoryProducts[currentCategory]?.map(product => {
        const quantity = getProductQuantity(product);
        const selected = isProductSelected(products, product, currentCategory);

        return (
          <ProductTile 
            key={product}
            $clickable={false}
          >
            <ProductContent>
              <ProductEmoji>{productEmojis[product]}</ProductEmoji>
              <ProductInfo>
                <ProductName>{product}</ProductName>
                <CategoryLabel>{currentCategory}</CategoryLabel>
              </ProductInfo>
            </ProductContent>
            {selected ? (
              <QuantityControls>
                <QuantityButton onClick={() => handleQuantityChange(product, -1)}>
                  <span className="material-icons">remove</span>
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(product, 1)}>
                  <span className="material-icons">add</span>
                </QuantityButton>
              </QuantityControls>
            ) : (
              <QuantityButton onClick={() => handleQuantityChange(product, 1)}>
                <span className="material-icons">add</span>
              </QuantityButton>
            )}
          </ProductTile>
        );
      })}
    </BottomPanel>
  );
};

export default BottomOptionsPanel;
