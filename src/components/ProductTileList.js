import React from 'react';
import { ProductTile, ProductContent, ProductEmoji, ProductInfo, ProductName, CategoryLabel } from './styled';
import { ReloadIcon } from './styled';
import { productEmojis } from '../data/groceryData';

const ProductTileList = ({ products, onTileClick }) => {
  return products.map((product, index) => (
    <ProductTile 
      key={index}
      onClick={() => onTileClick(index)}
      $clickable={true}
    >
      <ProductContent>
        <ProductEmoji>{productEmojis[product.name]}</ProductEmoji>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <CategoryLabel>{product.category}</CategoryLabel>
        </ProductInfo>
      </ProductContent>
      <ReloadIcon className="material-icons">
        refresh
      </ReloadIcon>
    </ProductTile>
  ));
};

export default ProductTileList;
