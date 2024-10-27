import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-5px);
  }
`;

export const CategoryButton = styled.button`
  background: ${props => props.$selected ? 'white' : 'white'};
  color: #1A1A1A;
  border: 1px solid ${props => props.$selected ? '#1A1A1A' : '#E6E6E6'};
  border-radius: 2px;
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

  &.fade-out {
    animation: ${fadeOut} 300ms ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CategoryPrompt = styled.div`
  color: #1A1A1A;
  padding: 8px 0;
  margin: 0 8px 8px 0;
  font-size: 14px;
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
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  margin-top: 16px;
  max-height: ${props => props.$expanded ? 'none' : '171px'};
  overflow-y: auto;
  position: relative;
`;

export const CategorySkrim = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 132px;
  height: 40px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  color: #1A1A1A;
  font-size: 14px;
  cursor: pointer;
`;

export const MaterialIcon = styled.span`
  font-family: 'Material Icons';
  font-size: 18px;
`;
