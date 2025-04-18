import { Sandpack } from "@codesandbox/sandpack-react";

export default () => {
  return (
    <Sandpack
      template="react"
      files={{
        "/index.js": `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
        "/App.js": `import Button from "./button.js";
export default function App() {
  return (
    <>
      <Button></Button>
    </>
  );
}`,
        "/button.js": `import styles from './styles.module.css'
export default () => <button className={styles.test}>按钮</button>;`,
        "/styles.module.css": `.test {
  color: red;
}`,
      }}
      options={{
        visibleFiles: ["/index.js", "/App.js", "/button.js", "/styles.css"],
        activeFile: "/button.js",
      }}
    />
  );
};
