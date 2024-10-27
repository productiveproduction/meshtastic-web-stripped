import React from 'react';
import styled from 'styled-components';
import { useAppStore } from '@core/stores/appStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { tablistRoutes, pagesRoutes } from '@core/utils/routes';

export default function Tablist() {
  const { activeTabIndex, setActiveTabIndex } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavButtonClick = (index: number, path: string) => {
    setActiveTabIndex(index);
    navigate(path);
  };

  const isRouteInPagesRoutes = pagesRoutes.some((route: any) =>
    location.pathname.startsWith(route.path)
  );

  return (
    <Navigation style={{ display: isRouteInPagesRoutes ? 'none' : 'block' }}>
      <NavContainer>
        {tablistRoutes.map((item: any, index: number) => (
          <NavButton
            key={index}
            $active={(activeTabIndex === index)}
            onClick={() => handleNavButtonClick(index, item.path)}
          >
            <item.icon size={20} />
            <NavLabel>{item.title}</NavLabel>
          </NavButton>
        ))}
      </NavContainer>
    </Navigation>
  );
};

const Navigation = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1rem;
`;

const NavContainer = styled.nav`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-radius: 2rem;
  border: 0.1px solid var(--theme);
  gap: 2rem;

  /* Added for outer glow effect */
  box-shadow: 0 0 50px var(--theme);
  backdrop-filter: blur(15px); /* Adjust blur radius as needed */
`;

const NavButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$active ? 'var(--accent)' : 'var(--muted)'};

  &:hover {
    color: ${props => props.$active ? 'var(--accent-hover)' : 'var(--muted-foreground)'};
  }
`;

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
`;
