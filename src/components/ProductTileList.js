import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { 
  ProductTile, 
  ProductContent, 
  ProductEmoji, 
  ProductInfo, 
  ProductName, 
  CategoryLabel, 
  ProductList,
  QuantityControls,
  QuantityButton,
  QuantityDisplay
} from './styled';
import { ReloadIcon } from './styled';
import { productEmojis } from '../data/groceryData';

const ProductTileList = ({ products, onTileClick, onQuantityChange }) => {
  const handleQuantityClick = (e, index, change) => {
    e.stopPropagation(); // Prevent tile click when clicking quantity buttons
    onQuantityChange(index, change);
  };

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
              <QuantityControls>
                <QuantityButton 
                  onClick={(e) => handleQuantityClick(e, index, -1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>
                  {product.quantity || 1}
                </QuantityDisplay>
                <QuantityButton 
                  onClick={(e) => handleQuantityClick(e, index, 1)}
                >
                  +
                </QuantityButton>
              </QuantityControls>
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
