# US Mandatory PTO & Statutory Compliance Library

A lightweight, zero-dependency, ultra-fast website built specifically as a knowledge source for Microsoft Copilot Studio agents (`Compliance Answer Desk`).

## 🚀 Features
1. **Direct Copilot Grounding (Semantic HTML)**: Uses semantic HTML tables containing all 7 USA mandatory PTO jurisdictions (Cook County, Chicago, Illinois, Nevada, California, New York, Washington). Microsoft Copilot web crawlers parse every row and statute accurately.
2. **Interactive & Editable UI**: Click any cell directly on the webpage to edit rules, dates, or thresholds.
3. **Add & Upload Spreadsheets**: Click **Upload CSV / Sheet** to view new laws dynamically or click **Add New Law / Row** to append entries directly in your browser.
4. **Live Search**: Instant keyword filtering across jurisdictions, ordinances, accrual rates, and carryover rules.

---

## 📦 How to Upload to GitHub (Takes ~60 Seconds)

1. Unzip `compliance-library-site.zip`. You will see:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
2. Go to [GitHub.com](https://github.com) and click **New Repository** (e.g., `compliance-library`). Make sure it is **Public**.
3. Click **Upload files**, select and upload `index.html`, `styles.css`, and `app.js`, then click **Commit changes**.
4. Go to repository **Settings** -> **Pages** (left sidebar).
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. Your website will be live at:
   ```
   https://<your-github-username>.github.io/compliance-library/
   ```

---

## 🤖 How to Connect to Your Copilot Agent
1. Open your Copilot Studio Agent Builder (**Compliance Answer Desk**).
2. Under **Knowledge**, click **`+ Add knowledge`**.
3. Select **Public website**.
4. Paste your short GitHub Pages URL: `https://<your-github-username>.github.io/compliance-library/`
5. Click **Add**.

---

## ❓ What if I need to upload more Excel files later?

There are two easy methods depending on your goal:

### Method 1: Save Directly on GitHub (Permanent for Copilot Agent)
Because Copilot crawls the live code hosted on GitHub:
- When you have a new law or Excel sheet, save it as a CSV or copy its rows.
- In GitHub, click on `index.html`, click the ✏️ **Edit** icon, add the new `<tr>` row inside `<tbody>`, and click **Commit changes**.
- GitHub Pages updates automatically within 30 seconds, and your Copilot Agent will immediately have access to the new laws!

### Method 2: On the Webpage Front-End
- If you just want to view, inspect, or edit another sheet on your computer, click **"📤 Upload CSV / Sheet"** on your live site.
- The site instantly re-renders the table with your new data, allows you to edit cells, and lets you download the updated version anytime.
