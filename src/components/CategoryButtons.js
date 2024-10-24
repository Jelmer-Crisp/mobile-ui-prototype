import React from 'react';
import { ButtonContainer, CategoryButton, MoreLink, ReloadIcon } from './styled';
import styled from 'styled-components';

const LabelText = styled.span`
  color: #666;
  margin-right: 8px;
  margin-bottom: 8px;  /* Match the button's bottom margin */
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  line-height: 1.2;
`;

const CategoryButtons = ({ categories, selectedCategories, onCategoryClick, showMore, onShowMore, version }) => {
  return (
    <ButtonContainer>
      {categories.map((category, index) => (
        <React.Fragment key={category}>
          {index === 0 && <LabelText>Also needed?</LabelText>}
          <CategoryButton
            $selected={version === 1 && selectedCategories.includes(category)}
            onClick={() => onCategoryClick(category)}
          >
            {category}
            {version === 1 && selectedCategories.includes(category) && (
              <ReloadIcon className="material-icons">
                refresh
              </ReloadIcon>
            )}
          </CategoryButton>
        </React.Fragment>
      ))}
      {!showMore && categories.length > 0 && (
        <MoreLink onClick={onShowMore}>
          More...
        </MoreLink>
      )}
    </ButtonContainer>
  );
};

export default CategoryButtons;
