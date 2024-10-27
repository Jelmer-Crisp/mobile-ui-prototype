import styled from 'styled-components';

export const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.$checked ? '#2196f3' : '#ccc'};
  border-radius: 4px;
`;

export const ProductTile = styled.div`
  background: white;
  padding: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  margin-bottom: 0;
  border-bottom: 1px solid #E6E6E6;
  box-sizing: border-box;

  &:active {
    ${props => props.$clickable && 'transform: scale(0.99);'}
  }

  &.tile-enter {
    opacity: 0;
    transform: translateY(-10px);
    height: 0;
    padding: 0;
  }

  &.tile-enter-active {
    opacity: 1;
    transform: translateY(0);
    height: auto;
    padding: 16px;
  }

  &.tile-exit {
    opacity: 1;
    transform: translateY(0);
    height: auto;
    padding: 16px;
  }

  &.tile-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    height: 0;
    padding: 0;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 4px;
`;

export const ProductEmoji = styled.span`
  font-size: 40px;
  margin: 0 24px 0 6px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductName = styled.div`
  color: #333;
`;

export const CategoryLabel = styled.div`
  color: #999;
  font-size: 12px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 -20px 20px -20px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 4px;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: none;
  background: #f0f0f0;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e4e4e4;
  }
  
  &:active {
    background: #d8d8d8;
    transform: scale(0.95);
  }

  .material-icons {
    font-size: 20px;
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
