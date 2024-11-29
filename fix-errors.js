const fs = require("fs");
const { execSync } = require("child_process");

// Step 1: Fix `next.config.js`
function fixNextConfig() {
  const configPath = "./next.config.js";
  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, "utf-8");
    // Remove the invalid namespace field
    config = config.replace(/namespace:\s*".*?",?\s*/g, "");
    fs.writeFileSync(configPath, config, "utf-8");
    console.log("✅ Fixed next.config.js: Removed invalid namespace field.");
  } else {
    console.log("⚠ next.config.js not found. Skipping...");
  }
}

// Step 2: Remove `.babelrc` if present
function removeBabelConfig() {
  const babelPath = "./.babelrc";
  if (fs.existsSync(babelPath)) {
    fs.unlinkSync(babelPath);
    console.log("✅ Removed .babelrc to enable SWC compiler.");
  } else {
    console.log("⚠ .babelrc not found. Skipping...");
  }
}

// Step 3: Install required dependencies
function installDependencies() {
  const dependencies = [
    "styled-components",
    "babel-plugin-styled-components",
    "@types/styled-components",
  ];

  try {
    console.log("Installing dependencies...");
    execSync(`npm install ${dependencies.join(" ")} --save-dev`, {
      stdio: "inherit",
    });
    console.log("✅ Dependencies installed successfully.");
  } catch (error) {
    console.error("❌ Error installing dependencies:", error.message);
  }
}

// Step 4: Restart Next.js dev server (Optional Step)
function restartDevServer() {
  console.log("Restarting the Next.js development server...");
  try {
    execSync("npm run dev", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Error restarting dev server:", error.message);
  }
}

// Execute all fixes
(function main() {
  console.log("Starting script to fix coding errors...");
  fixNextConfig();
  removeBabelConfig();
  installDependencies();
  console.log(
    "🚀 All fixes applied. Please restart the development server manually if needed."
  );
})();
