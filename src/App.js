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
  Checkbox
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

  const isProductSelected = (productName, category) => {
    return products.some(p => p.name === productName && p.category === category);
  };

  const findLastProductIndexForCategory = (category) => {
    for (let i = products.length - 1; i >= 0; i--) {
      if (products[i].category === category) {
        return i;
      }
    }
    return -1;
  };

  const addProduct = (productName, category) => {
    const lastIndex = findLastProductIndexForCategory(category);
    const newProduct = { name: productName, category };
    
    if (lastIndex === -1) {
      // No products from this category yet, add to end
      setProducts([...products, newProduct]);
    } else {
      // Insert after the last product of the same category
      const newProducts = [...products];
      newProducts.splice(lastIndex + 1, 0, newProduct);
      setProducts(newProducts);
    }
  };

  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category)) {
      // First tap: just add default product and select category
      setSelectedCategories([...selectedCategories, category]);
      addProduct(categoryProducts[category][0], category);
    } else {
      // Subsequent taps: show options panel
      setCurrentCategory(category);
      setPanelOpen(true);
    }
  };

  const handleProductToggle = (productName) => {
    const isSelected = isProductSelected(productName, currentCategory);
    
    if (isSelected) {
      // Remove product
      setProducts(products.filter(p => !(p.name === productName && p.category === currentCategory)));
      
      // If this was the last product in the category, remove the category
      const remainingInCategory = products.filter(p => p.category === currentCategory).length - 1;
      if (remainingInCategory === 0) {
        setSelectedCategories(selectedCategories.filter(c => c !== currentCategory));
      }
    } else {
      // Add product
      addProduct(productName, currentCategory);
      
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
        
        {categoryProducts[currentCategory]?.map(product => {
          const isSelected = isProductSelected(product, currentCategory);
          return (
            <ProductTile 
              key={product}
              onClick={() => handleProductToggle(product)}
              $clickable={true}
            >
              <ProductContent>
                <ProductEmoji>{productEmojis[product]}</ProductEmoji>
                <ProductInfo>
                  <ProductName>{product}</ProductName>
                  <CategoryLabel>{currentCategory}</CategoryLabel>
                </ProductInfo>
              </ProductContent>
              <Checkbox $checked={isSelected}>
                {isSelected && <span className="material-icons">check</span>}
              </Checkbox>
            </ProductTile>
          );
        })}
      </BottomPanel>
    </AppContainer>
  );
}

export default App;
