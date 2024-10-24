import { useState, useEffect, useRef } from 'react';
import { AppContainer, ScrollableContainer, Overlay } from './components/styled';
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

const VersionToggle = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const VersionLink = styled.button`
  background: none;
  border: none;
  color: #2196f3;
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  font-weight: ${props => props.$active ? '600' : '400'};
`;

function App() {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [hiddenCategories, setHiddenCategories] = useState([]);
  const [version, setVersion] = useState(1);
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [products]);

  const categories = showMore 
    ? [...initialCategories, ...extraCategories]
    : initialCategories;

  const handleCategoryClick = (category) => {
    if (version === 1) {
      // Version 1: Original behavior - keep button and show reload icon
      if (!selectedCategories.includes(category)) {
        setSelectedCategories([...selectedCategories, category]);
        setProducts(addProduct(products, categoryProducts[category][0], category));
      } else {
        setCurrentCategory(category);
        setPanelOpen(true);
      }
    } else {
      // Version 2: Hide button behavior
      setSelectedCategories([...selectedCategories, category]);
      setProducts(addProduct(products, categoryProducts[category][0], category));
      setHiddenCategories([...hiddenCategories, category]);

      if ([...hiddenCategories, category].length === 3 && !showMore) {
        setShowMore(true);
      }
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

  const handleVersionChange = (newVersion) => {
    setVersion(newVersion);
    // Reset states when switching versions
    setSelectedCategories([]);
    setProducts([]);
    setHiddenCategories([]);
    setShowMore(false);
  };

  return (
    <AppContainer>
      <ScrollableContainer ref={containerRef}>
        <VersionToggle>
          <VersionLink 
            onClick={() => handleVersionChange(1)} 
            $active={version === 1}
          >
            Version 1
          </VersionLink>
          <VersionLink 
            onClick={() => handleVersionChange(2)} 
            $active={version === 2}
          >
            Version 2
          </VersionLink>
        </VersionToggle>
        <BasketHeader>Basket</BasketHeader>
        <ProductTileList 
          products={products}
          onTileClick={handleTileClick}
        />
        <CategoryButtons 
          categories={version === 1 ? categories : categories.filter(category => !hiddenCategories.includes(category))}
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
          showMore={showMore}
          onShowMore={() => setShowMore(true)}
          version={version}
        />
      </ScrollableContainer>

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
