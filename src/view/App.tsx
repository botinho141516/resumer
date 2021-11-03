import { GlobalStyle } from "./styles/GlobalStyle";

import HomePage from "./pages/HomePage";
import { RecoilRoot } from "recoil";

export function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <HomePage />
      </RecoilRoot>
    </>
  );
}
