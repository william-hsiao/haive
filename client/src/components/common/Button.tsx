import React, { FC, MouseEvent, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface IStyledButton {
  icon?: boolean;
  variant: string;
}
const StyledButton = styled.div<IStyledButton>`
  border: 1px solid;
  border-radius: ${(props) => props.theme.styles.borderRadius};
  padding: 0.5rem 1rem;
  box-sizing: border-box;

  font-size: ${(props) => props.theme.styles.fontSize};
  font-family: ${(props) => props.theme.styles.fontFamily};
  font-weight: 600;
  color: ${(props) => props.theme.styles.textColour};

  ${(props) => {
    switch (props.variant) {
      case 'filled':
        return css`
          color: ${(props) => props.theme.colours.white};
          border-color: ${(props) => props.theme.colours.primary70};
          background-color: ${(props) => props.theme.colours.primary70};

          &:hover {
            border-color: ${(props) => props.theme.colours.primary60};
            background-color: ${(props) => props.theme.colours.primary60};
          }

          &:active {
            border-color: ${(props) => props.theme.colours.primary80};
            background-color: ${(props) => props.theme.colours.primary80};
          }
        `;
      case 'borderless':
        return css`
          border-color: ${(props) => props.theme.colours.transparent};
          background-color: ${(props) => props.theme.colours.transparent};

          &:hover {
            background-color: ${(props) => props.theme.colours.grey10};
          }

          &:active {
            background-color: ${(props) => props.theme.colours.grey20};
          }
        `;
      default:
        return css`
          border-color: ${(props) => props.theme.colours.grey70};

          &:hover {
            background-color: ${(props) => props.theme.colours.grey10};
          }

          &:active {
            background-color: ${(props) => props.theme.colours.grey20};
          }
        `;
    }
  }}

  ${(props) => (props.icon ? 'padding-left: 3rem;' : '')}

  ${(props) => props.theme.mixins.outline}
`;
const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;

  svg {
    color: ${(props) => props.theme.colours.grey60};
    height: 100%;
    width: 100%;
  }
`;

interface IButton {
  label: string;
  variant?: 'filled' | 'border' | 'borderless';
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
}
const Button: FC<IButton> = ({
  label,
  variant = 'border',
  onClick,
  className,
  icon,
}) => {
  return (
    <StyledButton
      role="button"
      className={className}
      onClick={onClick}
      icon={!!icon}
      variant={variant}
      tabIndex={0}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {label && <span>{label}</span>}
    </StyledButton>
  );
};

export default Button;
