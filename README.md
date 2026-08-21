# 📊 TEESZONE Sales Pipeline & Performance Manager App

A modern, responsive, zero-backend React web application engineered for **TEESZONE Clothing Private Limited** to track, review, and forecast sales performance against monthly targets (₹3,00,000 per person).

---

## 🌟 Key Features

- **2-Page Architecture**:
  1. **Authentication Hub**: Branded Login and Sign-Up page with fast 1-click Demo credentials for quick review.
  2. **Sales Pipeline Dashboard**: Real-time sales pipeline review covering all 8 agenda questions with team KPI cards, charts, and lead breakdowns.
- **Dynamic Google Sheets & Google Forms Live Sync**:
  - Direct client-side synchronization with published Google Sheets Web CSV endpoints.
  - Whenever a new sales representative submits their response via Google Forms, the dashboard automatically detects the new person, adds their profile card, recalculates individual balances, and scales the Total Team Target (e.g., ₹3,00,000 × N reps).
- **The 8 Sales Pipeline Review Questions Covered**:
  - 1️⃣ **Actual sales achieved till today** (₹)
  - 2️⃣ **Balance amount required to reach ₹3L** (₹)
  - 3️⃣ **Current active leads available** (Count)
  - 4️⃣ **Lead-wise expected order value** (₹)
  - 5️⃣ **Hot / Warm / New lead status breakdown** (Distribution & ₹ values)
  - 6️⃣ **Realistic conversion leads this month** (Itemized deals with probabilities)
  - 7️⃣ **Action plan to achieve target before 31 August** (Strategy notes)
  - 8️⃣ **New leads required if pipeline is insufficient** (Gap calculations)
- **TEESZONE Signature Design**:
  - Built with Tailwind CSS matching the brand palette (`#3e0211`, `#5a1725`, `#da7c89`, `#E60067`, and warm accents `#F5EBDD`).
  - Interactive Target vs. Actual charts, pipeline health pills, and month-end forecast projections.

---

## 🚀 How to Run the Code in VS Code

Follow these simple steps to run the application on your computer using VS Code:

### Step 1: Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder...** and select this project directory:
   ```
   teeszone_sales_performance_manager_app
   ```

### Step 2: Open Integrated Terminal
- Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (or go to **Terminal > New Terminal** in the top menu).

### Step 3: Install Dependencies (if not already done)
In the terminal, run:
```bash
npm install
```

### Step 4: Start the Development Server
Run the following command:
```bash
npm run dev
```

### Step 5: View the App in Browser
- Open your browser and navigate to:
  ```
  http://localhost:3000
  ```
- Use the 1-click **Fast Demo Sign-In** button or enter any email to immediately log in!

---

## 🔗 How to Connect Live Google Forms / Google Sheets

1. Create a Google Form containing your 8 pipeline review questions.
2. Link the responses to a **Google Sheet**.
3. In the Google Sheet, go to **File > Share > Publish to web**.
4. Select **Entire Document (or Form Responses)**, choose **Comma-separated values (.csv)**, and click **Publish**.
5. Copy the generated URL and click the **Settings (⚙️)** button in the app's top bar to paste your link.
6. The app will sync automatically every 30 seconds and update team metrics in real time!

---

## 🛠️ Tech Stack & Folder Structure

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + Material Symbols
- **Data Engine**: PapaParse (CSV Streaming Parser)

```
├── public/
│   └── teeszone_logo.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddRepModal.jsx
│   │   ├── KPIGrid.jsx
│   │   ├── MonthEndForecastCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── PerformanceChart.jsx
│   │   ├── PipelineHealthCard.jsx
│   │   ├── RepDetailModal.jsx
│   │   ├── SyncConfigModal.jsx
│   │   └── TeamTable.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SalesDataContext.jsx
│   ├── data/
│   │   └── defaultSalesData.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   └── LoginPage.jsx
│   ├── services/
│   │   └── googleSheetsService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License
© 2026 TEESZONE Clothing Private Limited. All rights reserved.
