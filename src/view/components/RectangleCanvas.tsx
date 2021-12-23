import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import pdfAtom from "../atoms/PdfAtom";
import rectanglesAtom, { IRectangleAtom } from "../atoms/RectanglesAtom";

interface ICanvas {
  isDrawing: boolean;
  height?: number;
  width?: number;
}

interface IRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Canvas = styled.canvas<ICanvas>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 3;
  cursor: ${(props) => (props.isDrawing ? "crosshair" : "default")};
  background-color: transparent;
  border: 1px solid blue;
`;

const Rectangle = styled.div<IRectangle>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  border: 1px solid blue;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  z-index: 2;
`;

interface RectangleCanvasProps {
  width: number;
  height: number;
}

function RectangleCanvas(props: RectangleCanvasProps) {
  const { height, width } = props;
  const [rectangles, setRectangles] = useRecoilState(rectanglesAtom);
  const pdf = useRecoilValue(pdfAtom);

  const initialPoint = useRef({ x: 0, y: 0 });
  const finalPoint = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  function handleMouseClick(e: MouseEvent) {
    if (isDrawing.current) return;

    initialPoint.current = { x: e.clientX, y: e.clientY };
    finalPoint.current = { x: e.clientX, y: e.clientY };
    isDrawing.current = true;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!initialPoint.current) return;

    finalPoint.current = { x: e.clientX, y: e.clientY };

    if (isDrawing.current) {
      drawRectangle();
    }
  }

  function handleClickRelease() {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    console.log({ initialPoint: initialPoint.current, finalPoint: finalPoint.current });

    const initialX = Math.min(finalPoint.current.x, initialPoint.current.x);
    const initialY = Math.min(finalPoint.current.y, initialPoint.current.y);
    const finalX = Math.max(finalPoint.current.x, initialPoint.current.x);
    const finalY = Math.max(finalPoint.current.y, initialPoint.current.y);

    const newRectangle: IRectangleAtom = {
      y: initialY,
      x: initialX,
      width: finalX - initialX,
      height: finalY - initialY,
      pdfPage: pdf.currentPage,
    };

    setRectangles((oldRectangles) => [...oldRectangles, newRectangle]);
  }

  const drawRectangle = () => {
    if (!initialPoint.current) return;
    if (!finalPoint.current) return;
    if (!canvas.current) return;

    const { x: canvasX, y: canvasY } = canvas.current.getBoundingClientRect();

    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.strokeRect(
      initialPoint.current.x + canvasX,
      initialPoint.current.y + canvasY,
      finalPoint.current.x - initialPoint.current.x,
      finalPoint.current.y - initialPoint.current.y
    );
  };

  useEffect(() => {
    if (!canvas.current) return;

    canvas.current.addEventListener("mousemove", handleMouseMove);
    canvas.current.addEventListener("mousedown", handleMouseClick);
    canvas.current.addEventListener("mouseup", handleClickRelease);
  }, [canvas]);

  return (
    <>
      <Canvas ref={canvas} isDrawing height={height} width={width} />
      {rectangles.map((rectangle) => (
        <Rectangle
          key={rectangle.y + rectangle.x + rectangle.width + rectangle.height}
          top={rectangle.y}
          left={rectangle.x}
          width={rectangle.width}
          height={rectangle.height}
        />
      ))}
    </>
  );
}

export default RectangleCanvas;
