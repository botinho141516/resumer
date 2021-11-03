import { atom } from "recoil";

export interface IRectangleAtom {
  x: number;
  y: number;
  width: number;
  height: number;
  pdfPage: number;
};

const rectanglesAtom = atom<IRectangleAtom[]>({
  key: "rectangles",
  default: [],
});


export default rectanglesAtom;