import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { 
  ProductTile, 
  ProductContent, 
  ProductEmoji, 
  ProductInfo, 
  ProductName,
  ProductList,
  QuantityControls,
  QuantityButton,
  QuantityDisplay
} from './styled/ProductComponents';
import { ReloadIcon } from './styled/CategoryComponents';
import { productEmojis } from '../data/groceryData';

const ProductTileList = ({ products, onTileClick, onQuantityChange }) => {
  // Create refs array at the component level
  const nodeRefs = React.useMemo(
    () => products.map(() => React.createRef()),
    [products.length] // Only recreate if number of products changes
  );

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
            nodeRef={nodeRefs[index]}
          >
            <ProductTile 
              ref={nodeRefs[index]}
              onClick={() => onTileClick(index)}
              $clickable={true}
            >
              <ProductContent>
                <ProductEmoji>{productEmojis[product.name]}</ProductEmoji>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <QuantityControls>
                    <QuantityButton 
                      onClick={(e) => handleQuantityClick(e, index, -1)}
                    >
                      <span className="material-icons">remove</span>
                    </QuantityButton>
                    <QuantityDisplay>
                      {product.quantity || 1}
                    </QuantityDisplay>
                    <QuantityButton 
                      onClick={(e) => handleQuantityClick(e, index, 1)}
                    >
                      <span className="material-icons">add</span>
                    </QuantityButton>
                  </QuantityControls>
                </ProductInfo>
              </ProductContent>
              <ReloadIcon className="material-icons">
                more_horiz
              </ReloadIcon>
            </ProductTile>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ProductList>
  );
};

export default ProductTileList;
