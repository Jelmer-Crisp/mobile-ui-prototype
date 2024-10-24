import styled from 'styled-components';

export const CategoryButton = styled.button`
  background: ${props => props.$selected ? '#E6E6E6' : 'white'};
  color: #1A1A1A;
  border: 1px solid #E6E6E6;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 8px 8px 0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:active {
    transform: scale(0.98);
  }
`;

export const ReloadIcon = styled.span`
  font-size: 16px !important;
  font-family: 'Material Icons';
`;

export const MoreLink = styled.button`
  background: none;
  border: none;
  color: #1A1A1A;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
`;