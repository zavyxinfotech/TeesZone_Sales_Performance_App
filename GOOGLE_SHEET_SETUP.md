# 📋 TEESZONE Google Sheets & Google Forms Setup Guide

Follow this guide to create and connect your live **Google Sheet / Google Form** to the **TEESZONE Sales Performance Manager App**.

---

## ⚡ Option 1: Instant 1-Click Import (Recommended)

1. Open [Google Sheets](https://sheets.new) in your browser.
2. Click **File > Import > Upload**.
3. Drag and drop the template file included in this repository:
   ```
   teeszone_sales_pipeline_template.csv
   ```
4. Choose **Replace current sheet** and click **Import data**.

---

## 📝 Option 2: Create Columns Manually in Google Sheet

Create a new Google Sheet named **"TEESZONE Sales Pipeline Review 2026"** with the following header columns in Row 1:

| Column | Header Name | Description | Example Value |
|---|---|---|---|
| **A** | `Representative Name` | Sales Person Name | Ramya |
| **B** | `Monthly Target` | Target in ₹ (Defaults to 300000) | 300000 |
| **C** | `1. Actual Sales Achieved` | **Q1**: Current sales achieved till today (₹) | 190000 |
| **D** | `3. Active Leads Count` | **Q3**: Total count of active opportunities | 16 |
| **E** | `4. Lead-wise Expected Order Value` | **Q4**: Total estimated value of active pipeline (₹) | 260000 |
| **F** | `5. Hot Leads Count` | **Q5**: High probability leads | 5 |
| **G** | `5. Warm Leads Count` | **Q5**: Medium probability leads | 7 |
| **H** | `5. New Leads Count` | **Q5**: Fresh inbound/outbound leads | 4 |
| **I** | `6. Realistic Converted Leads` | **Q6**: Expected closing value before 31 Aug (₹) | 175000 |
| **J** | `7. Action Plan Strategy` | **Q7**: Action plan to close deals before month end | Daily client follow-ups and PO approvals |
| **K** | `8. New Leads Needed` | **Q8**: Additional leads required if pipeline is short | 2 |

---

## 🌐 How to Publish to Web CSV for Live Auto-Sync

1. In your Google Sheet, click **File > Share > Publish to web**.
2. Under **Link**, select:
   - **Entire Document** (or Sheet1)
   - Change "Web page" to **Comma-separated values (.csv)**
3. Click **Publish** and copy the generated URL.
4. In the **TEESZONE React App**:
   - Click the **Settings (⚙️)** button in the top navigation bar.
   - Paste the published CSV URL in the **Google Sheet Published CSV URL** input.
   - Click **Save & Sync**.

---

## 📝 Google Form Integration (For Sales Reps)

To collect daily responses automatically:
1. Create a Google Form titled **"TEESZONE August Sales Pipeline Review"**.
2. Add the 8 review questions as short answer / number fields.
3. In the **Responses** tab of Google Forms, click **Link to Sheets** and select your sheet.
4. As soon as any sales representative submits the Google Form, the Google Sheet updates, and the **TEESZONE App automatically pulls the new row within 30 seconds** without requiring any backend server!
