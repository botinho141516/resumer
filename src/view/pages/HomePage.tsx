import styled, { keyframes } from 'styled-components';
import controllers from '../../controllers';
import Button from '../components/Button';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 24px;
  }
`;

const Image = styled.img`
  width: 240px;
  animation: ${rotate} 15s linear infinite;
`;

const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`;

function HomePage() {
//   function handleSayHello() {
//     window.Main.sendMessage('Hello World');
// 
//     console.log('Message sent! Check main process log in terminal.')
//   }

  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
      <Button onClick={() => controllers.resumeText('Send message to main process')}>Send message to main process</Button>
    </Container>
  )
}

export default HomePage;

