# 📤 Export TaskMate AI to Other Software Guide

## 🎯 Understanding the Issue

When you try to open code from Figma Make in other software (VS Code, WebStorm, etc.), you might see errors about "binary or unsupported format." This guide explains why and how to properly export your project.

---

## 🔍 Why This Happens

1. **Figma Make Format:** Figma Make uses a special internal format optimized for web preview
2. **Browser-Based Editor:** The code is structured for in-browser execution
3. **No Direct File Access:** Files exist in the browser's environment, not as traditional files

---

## ✅ Solution: Export Your Project Properly

### Method 1: Manual Copy & Setup (Recommended)

#### Step 1: Create Project Structure Locally

Create a new folder on your computer:
```bash
mkdir taskmate-ai
cd taskmate-ai
```

#### Step 2: Initialize Node Project

```bash
npm init -y
```

#### Step 3: Copy package.json

Replace the contents of your local `package.json` with this:

```json
{
  "name": "taskmate-ai",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.14.4",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "sonner": "^2.0.3",
    "lucide-react": "latest",
    "recharts": "^2.10.0",
    "react-hook-form": "^7.55.0",
    "@radix-ui/react-avatar": "latest",
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-popover": "latest",
    "@radix-ui/react-progress": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-tooltip": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.4.5",
    "vite": "^5.2.11"
  }
}
```

#### Step 4: Create Required Config Files

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**tsconfig.node.json:**
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**index.html:** (Create in root)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TaskMate AI - Your Productivity Companion</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

**main.tsx:** (Create in root)
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

#### Step 5: Copy All Files from Figma Make

Now copy all your files maintaining the folder structure:

1. **From Figma Make, copy:**
   - `App.tsx` → to root folder
   - All files in `components/` → to local `components/` folder
   - All files in `styles/` → to local `styles/` folder
   - Documentation files (README.md, etc.) → to root folder

2. **Create folder structure:**
```
taskmate-ai/
├── index.html
├── main.tsx
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── package.json
├── App.tsx
├── components/
│   ├── [all component files]
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── [UI component files]
├── styles/
│   └── globals.css
└── README.md
```

#### Step 6: Install Dependencies

```bash
npm install
```

#### Step 7: Run the Project

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`

---

### Method 2: Use Browser DevTools (Quick Export)

#### For All Files at Once:

1. **Open Browser Console** (F12)
2. **Run this script** to download all files as a bundle:

```javascript
// This will help you see all file contents
// Copy each file manually to your local setup
```

#### For Individual Files:

1. Click on any file in Figma Make
2. Select All (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)
4. Paste into your local editor

---

### Method 3: Use GitHub (Best for Teams)

1. **Push to GitHub from Figma Make** (if supported)
2. **Clone the repository locally:**
   ```bash
   git clone https://github.com/yourusername/taskmate-ai.git
   cd taskmate-ai
   npm install
   npm run dev
   ```

---

## 🔧 Common Issues After Export

### Issue 1: Import Paths Don't Work

**Problem:**
```typescript
import { Button } from './ui/button';  // ❌ Doesn't work
```

**Solution:**
```typescript
import { Button } from './components/ui/button';  // ✅ Works
```

Update import paths in your files to match the new structure.

---

### Issue 2: Motion/React Import Errors

**Problem:**
```
Cannot find module 'motion/react'
```

**Solution:**
```bash
npm install motion@latest
```

Then verify imports:
```typescript
import { motion, AnimatePresence } from 'motion/react';  // ✅ Correct
```

---

### Issue 3: Sonner Import Errors

**Problem:**
```
Cannot find module 'sonner@2.0.3'
```

**Solution:**
In your local setup, use:
```typescript
import { toast } from 'sonner';  // ✅ Without version
```

Or update package.json:
```json
"sonner": "2.0.3"
```

---

### Issue 4: Tailwind Not Working

**Problem:** Styles don't appear

**Solution:**

1. Make sure `styles/globals.css` has:
```css
@import "tailwindcss";
```

2. Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 📦 Creating a ZIP File for Sharing

### Option 1: Using File Explorer

1. Navigate to your `taskmate-ai` folder
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. Share the ZIP file

### Option 2: Using Command Line

**Mac/Linux:**
```bash
cd ..
zip -r taskmate-ai.zip taskmate-ai/ -x "*/node_modules/*" "*/dist/*" "*/.git/*"
```

**Windows PowerShell:**
```powershell
Compress-Archive -Path taskmate-ai -DestinationPath taskmate-ai.zip -CompressionLevel Optimal
```

**Important:** Exclude these folders from ZIP:
- `node_modules/` (too large)
- `dist/` or `build/` (generated files)
- `.git/` (version control)

---

## 🚀 Opening in Different IDEs

### VS Code
```bash
cd taskmate-ai
code .
```

### WebStorm
```
File → Open → Select taskmate-ai folder
```

### Sublime Text
```
File → Open Folder → Select taskmate-ai
```

### Cursor / Windsurf
```bash
cursor taskmate-ai
# or
windsurf taskmate-ai
```

---

## ✅ Verification Checklist

After export, verify:

- [ ] All component files are present
- [ ] All UI component files are copied
- [ ] styles/globals.css is in place
- [ ] package.json has all dependencies
- [ ] Config files are created (vite.config.ts, tsconfig.json)
- [ ] `npm install` runs successfully
- [ ] `npm run dev` starts the development server
- [ ] App loads in browser without errors
- [ ] All features work (drag-drop, animations, etc.)

---

## 🎯 Recommended File Structure for Export

```
taskmate-ai/
├── .gitignore              ← Add this
├── index.html              ← Create this
├── main.tsx                ← Create this
├── vite.config.ts          ← Create this
├── tsconfig.json           ← Create this
├── tsconfig.node.json      ← Create this
├── postcss.config.js       ← Create this
├── package.json            ← Update this
├── README.md               ← Copy from Figma Make
├── App.tsx                 ← Copy from Figma Make
├── components/             ← Copy entire folder
│   ├── *.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── *.tsx
├── styles/                 ← Copy entire folder
│   └── globals.css
└── docs/                   ← Optional
    └── *.md
```

---

## 💡 Pro Tips

1. **Use Git:** Initialize a Git repository immediately after export
   ```bash
   git init
   git add .
   git commit -m "Initial commit from Figma Make"
   ```

2. **Test Immediately:** Run `npm run dev` right after setup to catch issues early

3. **Document Changes:** Keep track of any modifications you make to imports or paths

4. **Version Control:** Use Git branches for experiments

5. **Backup:** Keep the Figma Make version as a backup until you've fully tested the export

---

## 🆘 Still Having Issues?

### If the project won't run:

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node version:**
   ```bash
   node --version  # Should be 18.x or higher
   ```

3. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

4. **Try alternative package manager:**
   ```bash
   npm install -g pnpm
   pnpm install
   pnpm dev
   ```

---

## 🎉 Success!

Once you've completed these steps, you'll have a fully functional local version of TaskMate AI that can be:
- ✅ Edited in any IDE
- ✅ Shared as a ZIP file
- ✅ Pushed to GitHub
- ✅ Deployed to hosting services
- ✅ Customized and extended

Happy coding! 🚀
