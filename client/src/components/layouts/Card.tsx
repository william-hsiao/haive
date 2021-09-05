import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colours.primary80};
  padding: 1rem;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    padding: 0;
    flex-grow: 1;
  }
`;

const ButtonWrapper = styled.div`
  flex-shrink: 0;
`;

interface ICard {
  className?: string;
  title: string;
  button?: ReactNode;
  children: ReactNode;
}
const Card: FC<ICard> = ({ className, title, button, children }) => {
  return (
    <div className={className}>
      <Header>
        <h3>{title}</h3>
        <ButtonWrapper>{button}</ButtonWrapper>
      </Header>
      {children}
    </div>
  );
};

export default Card;
