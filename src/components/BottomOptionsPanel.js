import React from 'react';
import { BottomPanel, PanelHeader, PanelTitle, CloseButton, ProductTile, ProductContent, ProductEmoji, ProductInfo, ProductName, CategoryLabel, Checkbox } from './StyledComponents';
import { productEmojis } from '../data/groceryData';
import { isProductSelected } from '../utils/productUtils';

const BottomOptionsPanel = ({ isOpen, currentCategory, products, categoryProducts, onClose, onProductToggle }) => {
  return (
    <BottomPanel $isOpen={isOpen}>
      <PanelHeader>
        <PanelTitle>{currentCategory} Options</PanelTitle>
        <CloseButton onClick={onClose}>
          <span className="material-icons">close</span>
        </CloseButton>
      </PanelHeader>
      
      {categoryProducts[currentCategory]?.map(product => {
        const selected = isProductSelected(products, product, currentCategory);
        return (
          <ProductTile 
            key={product}
            onClick={() => onProductToggle(product)}
            $clickable={true}
          >
            <ProductContent>
              <ProductEmoji>{productEmojis[product]}</ProductEmoji>
              <ProductInfo>
                <ProductName>{product}</ProductName>
                <CategoryLabel>{currentCategory}</CategoryLabel>
              </ProductInfo>
            </ProductContent>
            <Checkbox $checked={selected}>
              {selected && <span className="material-icons">check</span>}
            </Checkbox>
          </ProductTile>
        );
      })}
    </BottomPanel>
  );
};

export default BottomOptionsPanel;
