import styled from 'styled-components';

export default function Loading() {
  return (
    <LoaderContainer>
      <ContentWrapper>
        <LoaderWrapper>
          <Logo
            src="/LYF-LOGO.jpg"
            alt="Lyf Logo"
            $fetchpriority="high"
            decoding="async"
          />
          <Loader />
        </LoaderWrapper>
      </ContentWrapper>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  transition: all 100ms;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  max-height: calc(100vh);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img<{ $fetchpriority: string }>`
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Loader = styled.div`
  --border-width: 15px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  --mask: radial-gradient(
    farthest-side,
    transparent calc(100% - var(--border-width) - 0.5px),
    #000 calc(100% - var(--border-width) + 0.5px)
  );
  -webkit-mask: var(--mask);
  mask: var(--mask);
  background:
    linear-gradient(0deg, #fff, #000514) 100% 0 / 50% 100% no-repeat,
    linear-gradient(#000514 20%, transparent 95%) 0 0 / 50% 100% no-repeat;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
