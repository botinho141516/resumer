import { ReactNode, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components';

const Container = styled.button`
  height: 42px;
  padding: 0 24px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: #8257e6;
  border-radius: 8px;
  border: 0;

  color: #FFF;
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
};

function Button(props: ButtonProps) {
  return (
    <Container type="button" {...props} />
  );
}

export default Button;