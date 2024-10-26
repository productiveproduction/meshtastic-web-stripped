import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus } from 'lucide-react';
import { Button } from '@componentsNEW/Button';

export default function Connect() {
  return (
    <Container>
      <CardContainer>
        <Card />
        <CardContent>
          <Logo
            src="/LYF-LOGO.jpg"
            alt="Lyf Logo"
            $fetchpriority="high"
            decoding="async"
          />
          <p>meshtastic</p>
          <p>not connected</p>
        </CardContent>
      </CardContainer>
      <ConnectionButton
        $variant="primary"
        size="small"
      >
        <Plus /> <span/> New Connection
      </ConnectionButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ConnectionButton = styled(Button)`
margin-top: 2rem;
margin-bottom: 2rem;
font-size: 1rem;

span {
  width: 1rem;
}
`

const CardContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  box-shadow: 0 0 2rem var(--theme);
  backdrop-filter: blur(50px);
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Card = styled.div`
  --border-width: 15px;
  --card-height: 40vh;
  --card-width: calc(var(--card-height) / 1.5);
  background: #191c29;
  width: var(--card-width);
  height: var(--card-height);
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(88 199 250 / 100%);
  cursor: pointer;
  font-family: cursive;
  clip-path: polygon(0% 0%, 0% 100%, 3% 100%, 3% 3%, 97% 3%, 97% 97%, 3% 97%, 3% 100%, 100% 100%, 100% 0);

  &::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
      132deg,
      #fff,
      #fff 43%,
      var(--theme)
    );
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    filter: blur(calc(var(--card-height) / 6));
    animation: ${spin} 2.5s linear infinite;
  }

  &::after {
    position: absolute;
    content: "";
    top: calc(var(--card-height) / 6);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(
      132deg,
      #fff,
      #fff 43%,
      #fff
    );
    opacity: 1;
    transition: opacity 0.5s;
    animation: ${spin} 2.5s linear infinite;
  }
`;

const CardContent = styled.div`
  color: var(--primary-foreground);
  width: 96.5%;
  height: 96.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: var(--primary-foreground);

  p:nth-child(2) {
    color: black;
    margin-bottom: 50%;
  }
  p:nth-child(3) {
    color: black;
    margin-top: 20%;
  }
`;

const Logo = styled.img<{ $fetchpriority: string }>`
  position: absolute;
  width: 5rem;
  height: 5rem;
  cursor: none;
`;
