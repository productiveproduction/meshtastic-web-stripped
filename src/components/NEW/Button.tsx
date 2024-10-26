import React from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const variantStyles = {
  primary: css`
    background-color: var(--primary);
    color: var(--primary-foreground);

    &:hover {
      background-color: var(--primary-hover);
    }
  `,
  secondary: css`
    background-color: var(--secondary);
    color: var(--secondary-foreground);

    &:hover {
      background-color: var(--secondary-hover);
    }
  `,
  outline: css`
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--theme);

    &:hover {
      background-color: var(--secondary-hover);
    }
  `
};

const sizeStyles = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `
};

const ButtonBase = styled.button.attrs<ButtonProps>(props => ({
  // This ensures the className from styled(Button) is properly applied
  className: props.className
}))<ButtonProps>`
  /* Reset default button styles */
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;
  
  /* Apply variant styles */
  ${props => props.$variant && variantStyles[props.$variant]}
  
  /* Apply size styles */
  ${props => props.size && sizeStyles[props.size]}
  
  /* Override any default button styles from media queries */
  &[type="button"], 
  &[type="submit"], 
  &[type="reset"] {
    background-color: inherit;
    color: inherit;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, $variant = 'primary', size = 'medium', children, onClick, ...props }, ref) => {
    return (
      <ButtonBase
        className={className}
        $variant={$variant}
        size={size}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }
)

Button.displayName = 'Button'

export { type ButtonProps }