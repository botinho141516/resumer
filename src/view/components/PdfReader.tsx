import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import pdfAtom, { IPdfAtom } from "../atoms/PdfAtom";
import pdf from "../../../assets/a.pdf";

const Container = styled.div`
  border: 1px solid red;
`;

function PdfContainer() {
  const [pdfState, setPdfState] = useRecoilState<IPdfAtom>(pdfAtom);
  const pdfRef = useRef<Document>(null);

  const changePageHandler = (newPage: number) => {
    setPdfState((prevPdf) => ({
      ...prevPdf,
      page: newPage,
    }));
  };

  const pdfLoadSuccesHandler = (pdfDocument: pdfjs.PDFDocumentProxy) => {
    setPdfState({
      currentPage: 1,
      totalPages: pdfDocument.numPages,
    });
  };
  const pdfLoadErrorHandler = (error: Error) => {
    console.error(error);
  };

  return (
    <Container>
      <Document
        ref={pdfRef}
        file={pdf}
        onLoadSuccess={pdfLoadSuccesHandler}
        onLoadError={pdfLoadErrorHandler}
      >
        <Page pageNumber={pdfState.currentPage} />
      </Document>
      <div
        style={{ zIndex: 1050 }}
        onClick={(e) => {
          e.stopPropagation();
          changePageHandler(pdfState.currentPage + 1);
        }}
      >
        next
      </div>
      <div
        style={{ zIndex: 101 }}
        onClick={(e) => {
          e.stopPropagation();
          changePageHandler(pdfState.currentPage - 1);
        }}
      >
        previous
      </div>
    </Container>
  );
}

export default PdfContainer;
