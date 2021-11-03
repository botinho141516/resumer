import { atom } from "recoil";

export interface IPdfAtom {
  currentPage: number;
  totalPages: number;
}

const pdfAtom = atom<IPdfAtom>({
  key: "pdfAtom",
  default: {
    currentPage: 0,
    totalPages: 0,
  },
});


export default pdfAtom;