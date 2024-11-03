import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 30vh;
  align-items: center;
  justify-content: center;
`;

const LoadingCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--primary-color);
  opacity: 0.5;
  animation: ${loadingAnimation} 1s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  &:nth-child(4) {
    animation-delay: 0.6s;
  }
`;

const LoadingText = styled.div`
  margin: 20px;
`;

const Loader = () => {
  return (
    <LoadingContainer>
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </LoadingContainer>
  );
};

export default Loader;
