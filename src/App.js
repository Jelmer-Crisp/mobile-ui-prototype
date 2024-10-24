import { useState, useEffect, useRef } from 'react';
import { AppContainer, ScrollableContainer, Overlay } from './components/StyledComponents';
import { initialCategories, extraCategories, categoryProducts } from './data/groceryData';
import { isProductSelected, addProduct } from './utils/productUtils';
import ProductTileList from './components/ProductTileList';
import CategoryButtons from './components/CategoryButtons';
import BottomOptionsPanel from './components/BottomOptionsPanel';
import styled from 'styled-components';

const BasketHeader = styled.h2`
  color: #333;
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
`;

function App() {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [products]);

  const categories = showMore 
    ? [...initialCategories, ...extraCategories]
    : initialCategories;

  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category)) {
      // First tap: just add default product and select category
      setSelectedCategories([...selectedCategories, category]);
      setProducts(addProduct(products, categoryProducts[category][0], category));
    } else {
      // Subsequent taps: show options panel
      setCurrentCategory(category);
      setPanelOpen(true);
    }
  };

  const handleProductToggle = (productName) => {
    const selected = isProductSelected(products, productName, currentCategory);
    
    if (selected) {
      // Remove product
      const newProducts = products.filter(p => !(p.name === productName && p.category === currentCategory));
      setProducts(newProducts);
      
      // If this was the last product in the category, remove the category
      const remainingInCategory = newProducts.filter(p => p.category === currentCategory).length;
      if (remainingInCategory === 0) {
        setSelectedCategories(selectedCategories.filter(c => c !== currentCategory));
      }
    } else {
      // Add product
      setProducts(addProduct(products, productName, currentCategory));
      
      // Make sure category is selected
      if (!selectedCategories.includes(currentCategory)) {
        setSelectedCategories([...selectedCategories, currentCategory]);
      }
    }
  };

  const handleTileClick = (index) => {
    const product = products[index];
    setCurrentCategory(product.category);
    setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
  };

  return (
    <AppContainer ref={containerRef}>
      <ScrollableContainer>
        <BasketHeader>Basket</BasketHeader>
        <ProductTileList 
          products={products}
          onTileClick={handleTileClick}
        />
      </ScrollableContainer>

      <CategoryButtons 
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryClick={handleCategoryClick}
        showMore={showMore}
        onShowMore={() => setShowMore(true)}
      />

      <Overlay $isOpen={panelOpen} onClick={handleClose} />
      <BottomOptionsPanel 
        isOpen={panelOpen}
        currentCategory={currentCategory}
        products={products}
        categoryProducts={categoryProducts}
        onClose={handleClose}
        onProductToggle={handleProductToggle}
      />
    </AppContainer>
  );
}

export default App;
