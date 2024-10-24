import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
`;

export const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  -webkit-overflow-scrolling: touch;
  padding-top: env(safe-area-inset-top, 20px);
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  z-index: 999;
`;

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

  &:active {
    ${props => props.$clickable && 'transform: scale(0.99);'}
  }

  &:last-child {
    margin-bottom: 0;
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
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

export const BottomPanel = styled.div`
  position: fixed;
  bottom: ${props => props.$isOpen ? '0' : '-100%'};
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  transition: bottom 0.3s ease;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PanelTitle = styled.h3`
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .material-icons {
    font-size: 20px;
  }
`;
