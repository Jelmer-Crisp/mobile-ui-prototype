import styled from 'styled-components';

export const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.$checked ? '#2196f3' : '#ccc'};
  border-radius: 4px;
`;

export const ProductTile = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  &:active {
    ${props => props.$clickable && 'transform: scale(0.99);'}
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.tile-enter {
    opacity: 0;
    transform: translateY(-10px);
    height: 0;
    padding: 0;
    margin: 0;
  }

  &.tile-enter-active {
    opacity: 1;
    transform: translateY(0);
    height: 72px;
    padding: 16px;
    margin-bottom: 16px;
  }

  &.tile-exit {
    opacity: 1;
    transform: translateY(0);
    height: 72px;
    padding: 16px;
    margin-bottom: 16px;
  }

  &.tile-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    height: 0;
    padding: 0;
    margin: 0;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const ProductEmoji = styled.span`
  font-size: 24px;
  margin-right: 16px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductName = styled.div`
  color: #333;
`;

export const CategoryLabel = styled.div`
  color: #999;
  font-size: 12px;
`;

export const ProductList = styled.div`
  margin-bottom: 16px;
`;
