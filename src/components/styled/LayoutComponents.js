import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  height: 100dvh;
  box-sizing: border-box;
  position: relative;
`;

export const ScrollableContainer = styled.div`
  height: calc(100% - env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
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
