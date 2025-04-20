import { Sandpack } from "@codesandbox/sandpack-react";
import { tree } from "next/dist/build/templates/app-page";

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
        // showPreview: false, // 关闭预览面板
        showNavigator: false, // 关闭顶部导航栏
        // showLineNumbers: true, // 可选：显示行号
        layout: "console", // 可选：垂直布局∏
        // readOnly: true, // 可选：只读模式
        // showReadOnly: true, // 可选：显示只读切换按钮
        externalResources: [], // 可选：外部资源
        showInlineErrors: true, // 可选：显示内联错误
        showLineNumbers: true, // 可选：显示行号
        // showFullScreen: true, // 可选：显示全屏按钮
        editorWidthPercentage: 100, // 可选：编辑器宽度百分比
        // showOpenInCodeSandbox: true, // 可选：显示打开 CodeSandbox 的按钮
        // showConsole: true, // 可选：显示控制台
      }}
      theme="dark"
    />
  );
};
