# Unwind MN Website — Setup Guide

## 1. Google Sheets Integration (Class Registration Tracking)

This captures every class registration into a Google Spreadsheet automatically.

### Step 1: Create a Google Sheet
1. Go to Google Sheets and create a new spreadsheet
2. Name it "Unwind Class Registrations"
3. In Row 1, add these headers:
   - A1: Timestamp
   - B1: First Name
   - C1: Last Name
   - D1: Email
   - E1: Phone
   - F1: Street Address
   - G1: City
   - H1: State
   - I1: Zip
   - J1: Class
   - K1: Credentials
   - L1: How Heard
   - M1: Questions/Notes

### Step 2: Add the Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste the contents of `google-apps-script.js` from this project
3. Click **Deploy > New Deployment**
4. Choose **Web app** as the type
5. Set "Execute as" to **Me**
6. Set "Who has access" to **Anyone**
7. Click **Deploy** and copy the Web App URL

### Step 3: Add the URL to the Website
1. Open `pages/classes.html`
2. Find `const GOOGLE_SHEETS_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace with your actual Web App URL

## 2. Stripe Payment (Class Payments)

### Option A: Stripe Payment Links (Easiest)
1. Create a Stripe account at stripe.com
2. Go to **Payment Links** in the dashboard
3. Create payment links for:
   - CST/MFR Early Bird: $400
   - CST/MFR Regular: $450
   - Other classes as needed
4. Open `pages/classes.html`
5. Replace `PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE` with your actual Stripe payment link URLs

### Option B: Stripe Checkout (More Control)
For a more integrated experience, you can use Stripe Checkout with a serverless function. This requires more setup but gives a smoother experience.

## 3. Contact Form
The contact form uses FormSubmit.co to forward messages to unwindmn@gmail.com. It works automatically — no setup needed. The first submission will trigger a confirmation email to verify the address.

## 4. GitHub & Netlify Deployment

### GitHub
1. The repo will be created at github.com/MrFoxzer/unwind-mn-website
2. Push all files to the main branch

### Netlify
1. Log into Netlify
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select the `unwind-mn-website` repo
4. Deploy settings: leave defaults (no build command needed for static HTML)
5. Set custom domain if desired

## 5. Images
Replace placeholder images with actual photos:
- Team photos for Brittney and Heather
- Hero background image
- Service/class imagery
- Add images to the `images/` folder and update the HTML `src` attributes
