import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import rectanglesAtom from "../atoms/RectanglesAtom";
import Button from "../components/Button";
import PdfContainer from "../components/PdfReader";
import RectangleCanvas from "../components/RectangleCanvas";

const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

function HomePage() {
  const [containerRef, setContainerRef] = useState<HTMLDivElement>(null);
  const rectangles = useRecoilValue(rectanglesAtom);

  const getRectangle = () => {
    console.log(rectangles);
  };

  return (
    <Container ref={(ref) => setContainerRef(ref)}>
      <RectangleCanvas
        height={containerRef?.getBoundingClientRect().height}
        width={containerRef?.getBoundingClientRect().width}
      />
      <PdfContainer />
      <Button style={{ zIndex: 100 }} onClick={getRectangle}>
        Save
      </Button>
    </Container>
  );
}

export default HomePage;
