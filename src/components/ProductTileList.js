import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ProductTile, ProductContent, ProductEmoji, ProductInfo, ProductName, CategoryLabel, ProductList } from './styled';
import { ReloadIcon } from './styled';
import { productEmojis } from '../data/groceryData';

const ProductTileList = ({ products, onTileClick }) => {
  return (
    <ProductList>
      <TransitionGroup>
        {products.map((product, index) => (
          <CSSTransition
            key={`${product.name}-${index}`}
            timeout={200}
            classNames="tile"
          >
            <ProductTile 
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
                swap_horiz
              </ReloadIcon>
            </ProductTile>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ProductList>
  );
};

export default ProductTileList;
