import React from 'react';
import { CategoryButton, ButtonContainer, MoreLink, CategoryPrompt, ReloadIcon } from './styled/CategoryComponents';

const CategoryButtons = ({ categories, selectedCategories, onCategoryClick, showMore, onShowMore, version }) => {
  return (
    <ButtonContainer>
      {version === 1 && <CategoryPrompt>Ook nodig?</CategoryPrompt>}
      {categories.map(category => (
        <CategoryButton
          key={category}
          onClick={() => onCategoryClick(category)}
          $selected={selectedCategories.includes(category)}
        >
          {category}
          {selectedCategories.includes(category) && (
            <ReloadIcon className="material-icons">swap_horiz</ReloadIcon>
          )}
        </CategoryButton>
      ))}
      {!showMore && (
        <MoreLink onClick={onShowMore}>
          Meer...
        </MoreLink>
      )}
    </ButtonContainer>
  );
};

export default CategoryButtons;
