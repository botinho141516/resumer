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
  z-index: 1;
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
  const currentPoint = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  function handleMouseDown(e: MouseEvent) {
    if (isDrawing.current) return;

    initialPoint.current = { x: e.clientX, y: e.clientY };
    currentPoint.current = { x: e.clientX, y: e.clientY };
    isDrawing.current = true;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!initialPoint.current) return;

    currentPoint.current = { x: e.clientX, y: e.clientY };

    if (isDrawing.current) {
      drawRectangle();
    }
  }

  function handleMouseUp() {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    const newRectangle: IRectangleAtom = {
      y: initialPoint.current.y,
      x: initialPoint.current.x,
      width: currentPoint.current.x - initialPoint.current.x,
      height: currentPoint.current.y - initialPoint.current.y,
      pdfPage: pdf.currentPage,
    };

    setRectangles((oldRectangles) => [...oldRectangles, newRectangle]);
  }

  const drawRectangle = () => {
    if (!initialPoint.current) return;
    if (!currentPoint.current) return;
    if (!canvas.current) return;

    const { x: canvasX, y: canvasY } = canvas.current.getBoundingClientRect();

    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.strokeRect(
      initialPoint.current.x + canvasX,
      initialPoint.current.y + canvasY,
      currentPoint.current.x - initialPoint.current.x,
      currentPoint.current.y - initialPoint.current.y
    );
  };

  useEffect(() => {
    if (!canvas.current) return;

    canvas.current.addEventListener("mousemove", handleMouseMove);
    canvas.current.addEventListener("mousedown", handleMouseDown);
    canvas.current.addEventListener("mouseup", handleMouseUp);
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
