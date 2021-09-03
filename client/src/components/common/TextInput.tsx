import React, { ChangeEvent, FC, ReactNode } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface IStyledInput {
  icon?: boolean;
}
const StyledInput = styled.input<IStyledInput>`
  border: 1px solid ${(props) => props.theme.colours.grey50};
  border-radius: ${(props) => props.theme.styles.borderRadius};
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  width: 100%;

  font-size: ${(props) => props.theme.styles.fontSize};
  font-family: ${(props) => props.theme.styles.fontFamily};
  color: ${(props) => props.theme.styles.textColour};

  &::placeholder {
    color: ${(props) => props.theme.colours.grey40};
  }

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

interface IInput {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: ReactNode;
}
const Input: FC<IInput> = ({
  value,
  onChange,
  className,
  placeholder,
  icon,
}) => {
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        icon={!!icon}
      />
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </InputWrapper>
  );
};

export default Input;
