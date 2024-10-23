import { useState, useEffect, useRef } from 'react';
import {
  AppContainer,
  Overlay,
  ProductTile,
  ProductContent,
  ProductEmoji,
  ProductInfo,
  ProductName,
  CategoryLabel,
  CategoryButton,
  ReloadIcon,
  MoreLink,
  ButtonContainer,
  BottomPanel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  RemoveButton
} from './components/StyledComponents';

const initialCategories = [
  'Cheese', 'Milk', 'Nuts', 'Juices', 'Bread', 'Fruits', 'Vegetables'
];

const extraCategories = [
  'Meat', 'Fish', 'Snacks', 'Drinks', 'Sweets'
];

const productEmojis = {
  'Gouda Cheese': '🧀',
  'Cheddar Cheese': '🧀',
  'Mozzarella': '🧀',
  'Full Fat Milk': '🥛',
  'Skimmed Milk': '🥛',
  'Almond Milk': '🥛',
  'Cashews': '🥜',
  'Almonds': '🥜',
  'Walnuts': '🥜',
  'Orange Juice': '🍊',
  'Apple Juice': '🍎',
  'Grape Juice': '🍇',
  'White Bread': '🍞',
  'Whole Wheat': '🥖',
  'Sourdough': '🥨',
  'Apples': '🍎',
  'Bananas': '🍌',
  'Oranges': '🍊',
  'Carrots': '🥕',
  'Broccoli': '🥦',
  'Spinach': '🥬',
  'Chicken': '🍗',
  'Beef': '🥩',
  'Pork': '🥓',
  'Salmon': '🐟',
  'Tuna': '🐟',
  'Cod': '🐟',
  'Chips': '🥔',
  'Crackers': '🍘',
  'Popcorn': '🍿',
  'Cola': '🥤',
  'Sparkling Water': '💧',
  'Iced Tea': '🧊',
  'Chocolate': '🍫',
  'Candy': '🍬',
  'Cookies': '🍪'
};

const categoryProducts = {
  Cheese: ['Gouda Cheese', 'Cheddar Cheese', 'Mozzarella'],
  Milk: ['Full Fat Milk', 'Skimmed Milk', 'Almond Milk'],
  Nuts: ['Cashews', 'Almonds', 'Walnuts'],
  Juices: ['Orange Juice', 'Apple Juice', 'Grape Juice'],
  Bread: ['White Bread', 'Whole Wheat', 'Sourdough'],
  Fruits: ['Apples', 'Bananas', 'Oranges'],
  Vegetables: ['Carrots', 'Broccoli', 'Spinach'],
  Meat: ['Chicken', 'Beef', 'Pork'],
  Fish: ['Salmon', 'Tuna', 'Cod'],
  Snacks: ['Chips', 'Crackers', 'Popcorn'],
  Drinks: ['Cola', 'Sparkling Water', 'Iced Tea'],
  Sweets: ['Chocolate', 'Candy', 'Cookies']
};

function App() {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['Fruits', 'Milk']);
  const [products, setProducts] = useState([
    { name: 'Apples', category: 'Fruits' },
    { name: 'Full Fat Milk', category: 'Milk' }
  ]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  
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

  const findProductIndexByCategory = (category) => {
    return products.findIndex(product => product.category === category);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      // Show bottom panel with options
      setCurrentCategory(category);
      setPanelOpen(true);
      const existingIndex = findProductIndexByCategory(category);
      setEditingIndex(existingIndex);
    } else {
      // Add a default product from this category
      setSelectedCategories([...selectedCategories, category]);
      setProducts([...products, {
        name: categoryProducts[category][0],
        category: category
      }]);
    }
  };

  const handleProductSelect = (product) => {
    setPanelOpen(false);
    if (editingIndex !== null) {
      // Replace existing product
      const newProducts = [...products];
      newProducts[editingIndex] = {
        name: product,
        category: currentCategory
      };
      setProducts(newProducts);
    } else {
      // Add new product
      setProducts([...products, {
        name: product,
        category: currentCategory
      }]);
    }
    setEditingIndex(null);
  };

  const handleTileClick = (index) => {
    const product = products[index];
    setCurrentCategory(product.category);
    setEditingIndex(index);
    setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
    setEditingIndex(null);
  };

  const handleRemoveCategory = () => {
    const newProducts = products.filter(product => product.category !== currentCategory);
    const newSelectedCategories = selectedCategories.filter(cat => cat !== currentCategory);
    setProducts(newProducts);
    setSelectedCategories(newSelectedCategories);
    setPanelOpen(false);
    setEditingIndex(null);
  };

  return (
    <AppContainer ref={containerRef}>
      <Overlay $isOpen={panelOpen} onClick={handleClose} />
      
      {products.map((product, index) => (
        <ProductTile 
          key={index}
          onClick={() => handleTileClick(index)}
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
      ))}

      <ButtonContainer>
        {categories.map(category => (
          <CategoryButton
            key={category}
            $selected={selectedCategories.includes(category)}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {selectedCategories.includes(category) && (
              <ReloadIcon className="material-icons">
                refresh
              </ReloadIcon>
            )}
          </CategoryButton>
        ))}
        {!showMore && (
          <MoreLink onClick={() => setShowMore(true)}>
            More...
          </MoreLink>
        )}
      </ButtonContainer>

      <BottomPanel $isOpen={panelOpen}>
        <PanelHeader>
          <PanelTitle>{currentCategory} Options</PanelTitle>
          <CloseButton onClick={handleClose}>
            <span className="material-icons">close</span>
          </CloseButton>
        </PanelHeader>
        
        {categoryProducts[currentCategory]?.map(product => (
          <ProductTile 
            key={product}
            onClick={() => handleProductSelect(product)}
            $clickable={true}
          >
            <ProductContent>
              <ProductEmoji>{productEmojis[product]}</ProductEmoji>
              <ProductInfo>
                <ProductName>{product}</ProductName>
                <CategoryLabel>{currentCategory}</CategoryLabel>
              </ProductInfo>
            </ProductContent>
          </ProductTile>
        ))}

        <RemoveButton onClick={handleRemoveCategory}>
          Remove {currentCategory} from basket
        </RemoveButton>
      </BottomPanel>
    </AppContainer>
  );
}

export default App;
