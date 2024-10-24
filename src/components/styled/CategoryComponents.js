import styled from 'styled-components';

export const CategoryButton = styled.button`
  background: ${props => props.$selected ? '#2196f3' : 'white'};
  color: ${props => props.$selected ? 'white' : '#2196f3'};
  border: 1px solid #2196f3;
  border-radius: 20px;
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
  color: #2196f3;
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
