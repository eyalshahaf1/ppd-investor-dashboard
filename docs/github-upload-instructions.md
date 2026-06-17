# GitHub Upload Instructions

## Option 1: Upload In The GitHub Website

1. Create a new GitHub repository.
2. Name it something clear, for example:

```text
ppd-investor-dashboard
```

3. Keep it private while the concept is sensitive.
4. Upload these files and folders:

```text
index.html
server.py
package.json
package-lock.json
next.config.ts
tsconfig.json
src/
README.md
docs/
assets/
.gitignore
```

5. Commit with this message:

```text
Initial investor dashboard demo
```

## Option 2: Upload From Terminal

From inside this folder:

```bash
git init
git add .
git commit -m "Initial investor dashboard demo"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/ppd-investor-dashboard.git
git push -u origin main
```

## GitHub Pages Demo Hosting

For a simple private or public web demo:

1. Go to the repository on GitHub.
2. Open **Settings**.
3. Open **Pages**.
4. Select branch `main`.
5. Select folder `/root`.
6. Save.

GitHub will provide a URL like:

```text
https://YOUR_ACCOUNT.github.io/ppd-investor-dashboard/
```

Use this only for non-confidential demo content. For sensitive investor meetings, keep the repo private and demo locally.

Important: GitHub Pages can host the static `index.html` dashboard, but it cannot run the Next.js app, `server.py`, or SQLite. For the Next.js app, use local `npm run dev`, Vercel, or another Node-capable host.

## Recommended Repository Visibility

Use **private** until:

- pilot partner names are removed,
- source assumptions are checked,
- legal wording is reviewed,
- brand and IP strategy are finalized,
- no confidential materials are embedded.

## What Not To Upload Publicly Yet

Do not publicly upload:

- customer names,
- live employee data,
- payroll exports,
- pension account files,
- private source logs,
- legal memos,
- partner NDAs,
- detailed proprietary measurement formulas before IP strategy is set.
