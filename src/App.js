import { useState, useEffect, useRef } from 'react';
import { AppContainer, ScrollableContainer, Overlay } from './components/styled';
import { allCategories, categoryProducts } from './data/groceryData';
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
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [hiddenCategories, setHiddenCategories] = useState([]);
  const [version, setVersion] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && shouldScroll) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setShouldScroll(false);
    }
  }, [products, shouldScroll]);

  const visibleCategories = allCategories.slice(0, visibleCategoryCount);

  const handleCategoryClick = (category) => {
    if (version === 1) {
      if (!selectedCategories.includes(category)) {
        setSelectedCategories([...selectedCategories, category]);
        setProducts(addProduct(products, categoryProducts[category][0], category));
        setShouldScroll(true);

        // Check if this is one of the last three visible categories
        const categoryIndex = visibleCategories.indexOf(category);
        if (categoryIndex >= visibleCategoryCount - 3 && visibleCategoryCount < allCategories.length) {
          setVisibleCategoryCount(prev => Math.min(prev + 3, allCategories.length));
        }
      } else {
        setCurrentCategory(category);
        setPanelOpen(true);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
      setProducts(addProduct(products, categoryProducts[category][0], category));
      setHiddenCategories([...hiddenCategories, category]);
      setShouldScroll(true);

      if ([...hiddenCategories, category].length === 3 && visibleCategoryCount < allCategories.length) {
        setVisibleCategoryCount(prev => Math.min(prev + 3, allCategories.length));
      }
    }
  };

  const handleShowMore = () => {
    setVisibleCategoryCount(prev => Math.min(prev + 3, allCategories.length));
  };

  const handleProductToggle = (productName, newQuantity) => {
    const selected = isProductSelected(products, productName, currentCategory);
    
    if (selected) {
      if (newQuantity !== undefined) {
        // Update quantity
        const newProducts = products.map(p => 
          p.name === productName && p.category === currentCategory
            ? { ...p, quantity: newQuantity }
            : p
        );
        setProducts(newProducts);
      } else {
        // Remove product
        const newProducts = products.filter(p => !(p.name === productName && p.category === currentCategory));
        setProducts(newProducts);
        
        const remainingInCategory = newProducts.filter(p => p.category === currentCategory).length;
        if (remainingInCategory === 0) {
          setSelectedCategories(selectedCategories.filter(c => c !== currentCategory));
        }
      }
    } else {
      setProducts(addProduct(products, productName, currentCategory));
      setShouldScroll(true);
      
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

  const handleQuantityChange = (index, change) => {
    const newProducts = [...products];
    const currentQuantity = newProducts[index].quantity || 1;
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      // Remove product if quantity reaches 0
      const removedProduct = newProducts[index];
      newProducts.splice(index, 1);
      setProducts(newProducts);
      
      // Check if this was the last product in the category
      const remainingInCategory = newProducts.filter(p => p.category === removedProduct.category).length;
      if (remainingInCategory === 0) {
        setSelectedCategories(selectedCategories.filter(c => c !== removedProduct.category));
      }
    } else {
      // Update quantity
      newProducts[index] = { ...newProducts[index], quantity: newQuantity };
      setProducts(newProducts);
    }
  };

  const handleClose = () => {
    setPanelOpen(false);
  };

  const handleVersionChange = (newVersion) => {
    setVersion(newVersion);
    setSelectedCategories([]);
    setProducts([]);
    setHiddenCategories([]);
    setVisibleCategoryCount(5);
  };

  return (
    <AppContainer>
      <ScrollableContainer ref={containerRef}>
        <VersionToggle>
          <VersionLink 
            onClick={() => handleVersionChange(1)} 
            $active={version === 1}
          >
            Versie 1
          </VersionLink>
          <VersionLink 
            onClick={() => handleVersionChange(2)} 
            $active={version === 2}
          >
            Versie 2
          </VersionLink>
        </VersionToggle>
        <BasketHeader>Mandje</BasketHeader>
        <ProductTileList 
          products={products}
          onTileClick={handleTileClick}
          onQuantityChange={handleQuantityChange}
        />
        <CategoryButtons 
          categories={version === 1 ? visibleCategories : visibleCategories.filter(category => !hiddenCategories.includes(category))}
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
          showMore={visibleCategoryCount > allCategories.length}
          onShowMore={handleShowMore}
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
