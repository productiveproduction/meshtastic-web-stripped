import * as React from "react";
import styled, { css } from "styled-components";
import type { LucideIcon } from "lucide-react";

type Variant = "default" | "invalid";

interface InputContainerProps {
  $hasAction?: boolean;
}

interface StyledInputProps {
  $variant: Variant;
  $hasAction?: boolean;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  variant?: Variant;
  prefix?: string;
  suffix?: string;
  action?: {
    icon: LucideIcon;
    onClick: () => void;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, variant = "default", prefix, suffix, action, ...props }, ref) => {
    return (
      <InputContainer>
        {prefix && <Prefix>{prefix}</Prefix>}
        <StyledInput
          $variant={variant}
          $hasAction={!!action}
          value={value}
          ref={ref}
          {...props}
        />
        {suffix && (
          <Suffix>
            <span>{suffix}</span>
          </Suffix>
        )}
        {action && (
          <ActionButton
            type="button"
            onClick={action.onClick}
          >
            <action.icon size={20} />
          </ActionButton>
        )}
      </InputContainer>
    );
  },
);


const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Prefix = styled.span`
  display: inline-flex;
  align-items: center;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  background-color: var(--background-primary);
  padding: 0 0.75rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const Suffix = styled.div`
  position: absolute;
  inset-y: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 2.25rem;
  pointer-events: none;
  font-family: monospace;
  color: var(--text-secondary);

  span {
    color: #6b7280;
    font-size: 0.875rem;
    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }
`;

const ActionButton = styled.button`
  position: absolute;
  inset-y: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  color: #6b7280;
  
  &:hover {
    color: #9ca3af;
  }
  
  &:focus {
    outline: none;
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  display: flex;
  height: 2.5rem;
  width: calc(100% - 1.5rem);
  border-radius: 0.375rem;
  border: 2px solid;
  background-color: transparent;
  color: var(--primary);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;

  ${props => props.$hasAction && css`
    padding-right: 2rem;
  `}

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.$variant === "default" && css`
    border-color: var(--theme);
    
    // @media (prefers-color-scheme: dark) {
    //   border-color: #334155;
    //   color: #f8fafc;
    // }
  `}

  ${props => props.$variant === "invalid" && css`
    border-color: #ef4444;
    
    // @media (prefers-color-scheme: dark) {
    //   border-color: #ef4444;
    // }
  `}

  &:focus {
    ring-color: #94a3b8;
    
    // @media (prefers-color-scheme: dark) {
    //   ring-color: #94a3b8;
    //   ring-offset-color: #0f172a;
    // }
  }
`;

Input.displayName = "Input";

export { Input };