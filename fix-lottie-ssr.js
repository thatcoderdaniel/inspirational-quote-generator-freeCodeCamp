const fs = require("fs");
const path = require("path");

const files = {
  "components/animations/AnimationElements.tsx":
    "import dynamic from 'next/dynamic'\n" +
    'import styled from "styled-components";\n' +
    'import Link from "next/link";\n' +
    'import Image from "next/image";\n\n' +
    "const Lottie = dynamic(() => import('react-lottie-player'), {\n" +
    "  ssr: false,\n" +
    "  loading: () => <div style={{ width: '250px', height: '250px' }} />\n" +
    "});\n\n" +
    "export const ImageBlobCon = styled.div`\n" +
    "    position: relative;\n" +
    "    text-align: center;\n" +
    "    top: 10px;\n" +
    "    margin-top: 20px;\n" +
    "    transition: 0.3s all ease-in-out;\n" +
    "    width: fit-content;\n" +
    "    margin: auto;\n" +
    "    height: 100px;\n" +
    "    z-index: 99999;\n" +
    "    &:hover {\n" +
    "        transform: scale(4.8);\n" +
    "        z-index: 99999;\n" +
    "        transition: 0.3s ease-in-out;\n" +
    "        box-shadow: 0 0 80px 90px rgba(0,0,0,0.6);\n" +
    "    }\n" +
    "`;\n",
};

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = filePath + ".backup";
    fs.copyFileSync(filePath, backupPath);
    console.log(`Backed up ${filePath}`);
  }
}

function writeFiles() {
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(process.cwd(), filePath);
    backupFile(fullPath);
    ensureDirectoryExists(fullPath);
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${filePath}`);
  });
}

function cleanBuild() {
  const nextDir = path.join(process.cwd(), ".next");
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true });
    console.log("Cleaned .next directory");
  }
}

writeFiles();
cleanBuild();
console.log("Setup complete. Run: npm run dev");
