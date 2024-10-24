import styled from 'styled-components';

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
