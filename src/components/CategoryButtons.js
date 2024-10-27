import React from 'react';
import { CategoryButton, ButtonContainer, MoreLink, CategoryPrompt, ReloadIcon, CategorySkrim, MaterialIcon } from './styled/CategoryComponents';

const CategoryButtons = ({ categories, selectedCategories, onCategoryClick, showMore, onShowMore, version }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <ButtonContainer $expanded={isExpanded}>
      {version === 1 && <CategoryPrompt>Ook nodig?</CategoryPrompt>}
      {categories.map(category => (
        <CategoryButton
          key={category}
          onClick={() => onCategoryClick(category)}
          $selected={selectedCategories.includes(category)}
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
        <MoreLink onClick={onShowMore}>
          Meer
          <MaterialIcon>keyboard_arrow_right</MaterialIcon>
        </MoreLink>
      )}
    </ButtonContainer>
  );
};

export default CategoryButtons;
