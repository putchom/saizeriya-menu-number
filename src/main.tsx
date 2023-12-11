import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Theme appearance="light" accentColor="grass" radius="large">
        <App />
      </Theme>
    </RecoilRoot>
  </React.StrictMode>,
);
