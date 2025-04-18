"use client";
import {
  CodeEditor,
  Sandpack,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackReactContext,
  SandpackStack,
} from "@codesandbox/sandpack-react";

const App = () => {
  const files = {};

  return (
    <SandpackProvider files={files} theme="dark" template="react">
      <SandpackReactContext>
        {({ files, updateFile }) => {
          const fileListValues = Object.values(files);
          const fileListKeys = Object.keys(files);

          return (
            <SandpackLayout>
              <SandpackStack style={{ padding: "10px 0" }}>
                <CodeEditor
                  code={fileListValues[0].code}
                  filePath={fileListKeys[0]}
                  onCodeUpdate={(newCode) =>
                    updateFile(fileListKeys[0], newCode)
                  }
                  showTabs
                />
              </SandpackStack>

              <SandpackStack style={{ padding: "10px 0" }}>
                <CodeEditor
                  code={fileListValues[1].code}
                  filePath={fileListKeys[1]}
                  onCodeUpdate={(newCode) =>
                    updateFile(fileListKeys[1], newCode)
                  }
                  showTabs
                />
              </SandpackStack>

              <SandpackPreview />
            </SandpackLayout>
          );
        }}
      </SandpackReactContext>
    </SandpackProvider>
  );
};

export default App;
