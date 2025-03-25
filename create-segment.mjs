import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get arguments
const [rawDir, rawName] = process.argv.slice(2);

if (!rawDir || !rawName) {
    console.error("❌ Usage: node create-segment.mjs <directory> <component-name>");
    process.exit(1);
}

// Convert kebab-case to PascalCase
const toPascalCase = (str) =>
    str
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

const folderName = rawName.toLowerCase();
const componentName = toPascalCase(rawName);

const targetDir = path.resolve(__dirname, rawDir);
const componentDir = path.join(targetDir, folderName);
const uiDir = path.join(componentDir, "ui");

if (fs.existsSync(componentDir)) {
    console.error(`❌ Component "${componentName}" already exists in "${rawDir}".`);
    process.exit(1);
}

// Create directories
fs.mkdirSync(componentDir, { recursive: true });
fs.mkdirSync(uiDir);

// Create index.ts
fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    `import ${componentName} from "./ui";\n\nexport { ${componentName} };\n`
);

// Create ui/index.tsx
fs.writeFileSync(
    path.join(uiDir, "index.tsx"),
    `import styles from "./styles.module.css";\n\nconst ${componentName} = () => {\n  return <>${folderName}</>;\n};\n\nexport default ${componentName};\n`
);

// Create ui/styles.module.css
fs.writeFileSync(path.join(uiDir, "styles.module.css"), `/* Styles for ${componentName} */\n`);

console.log(`✅ Component "${componentName}" created in "${componentDir}" successfully!`);
