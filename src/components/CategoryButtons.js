import React from 'react';
import { CategoryButton, ButtonContainer, MoreLink, CategoryPrompt, ReloadIcon, CategorySkrim, MaterialIcon } from './styled/CategoryComponents';

const CategoryButtons = ({ categories, selectedCategories, onCategoryClick, showMore, onShowMore, version }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [prevCategories, setPrevCategories] = React.useState([]);
  const [isInitialRender, setIsInitialRender] = React.useState(true);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [fadingOutCategory, setFadingOutCategory] = React.useState(null);

  React.useEffect(() => {
    if (isInitialRender) {
      setPrevCategories(categories);
      setIsInitialRender(false);
      return;
    }

    const newOnes = categories.filter(cat => !prevCategories.includes(cat));
    if (newOnes.length > 0) {
      setIsAnimating(true);
      const startIndex = prevCategories.length;
      
      categories.forEach((category, index) => {
        if (newOnes.includes(category)) {
          const newIndex = index - startIndex;
          const button = document.querySelector(`[data-category="${category}"]`);
          if (button) {
            button.style.animation = `fadeIn 300ms ease-out ${newIndex * 300}ms backwards`;
          }
        }
      });

      // Calculate when all animations will be complete
      const totalAnimationTime = (newOnes.length) * 300;
      
      // After all buttons have animated, show and animate the 'Meer' link
      setTimeout(() => {
        const moreLink = document.querySelector('[data-more-link]');
        if (moreLink) {
          moreLink.style.display = 'flex';
          moreLink.style.animation = 'fadeIn 300ms ease-out backwards';
        }
        setIsAnimating(false);
      }, totalAnimationTime);
    }

    setPrevCategories(categories);
  }, [categories, isInitialRender, prevCategories]);

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  const handleCategoryClick = (category) => {
    if (version === 2 && !selectedCategories.includes(category)) {
      const button = document.querySelector(`[data-category="${category}"]`);
      if (button) {
        setFadingOutCategory(category);
        button.classList.add('fade-out');
        setTimeout(() => {
          setFadingOutCategory(null);
          onCategoryClick(category);
        }, 300); // Match the animation duration
      }
    } else {
      onCategoryClick(category);
    }
  };

  return (
    <ButtonContainer $expanded={isExpanded}>
      {version === 1 && <CategoryPrompt>Ook nodig?</CategoryPrompt>}
      {categories.map((category) => (
        <CategoryButton
          key={category}
          data-category={category}
          onClick={() => handleCategoryClick(category)}
          $selected={selectedCategories.includes(category)}
          disabled={fadingOutCategory === category}
        >
          {category}
          {selectedCategories.includes(category) && (
            <ReloadIcon className="material-icons">more_horiz</ReloadIcon>
          )}
        </CategoryButton>
      ))}
      {!isExpanded && (
        <CategorySkrim onClick={handleExpand}>
          Toon meer
          <MaterialIcon>keyboard_arrow_up</MaterialIcon>
        </CategorySkrim>
      )}
      {!showMore && (
        <MoreLink 
          onClick={onShowMore}
          data-more-link
          style={{ 
            display: isAnimating ? 'none' : 'flex'
          }}
        >
          Meer
          <MaterialIcon>keyboard_arrow_right</MaterialIcon>
        </MoreLink>
      )}
    </ButtonContainer>
  );
};

export default CategoryButtons;
