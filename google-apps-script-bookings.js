// ============================================
// Google Apps Script — Unwind Booking System
// Paste this into a NEW Google Sheet > Extensions > Apps Script
// Then Deploy as Web App
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;

    sheet.appendRow([
      new Date(),                          // Timestamp
      data.service || '',                  // Service
      data.duration || '',                 // Duration
      data.location || '',                 // Location
      data.address || '',                  // Location Address
      data.date || '',                     // Preferred Date
      data.altDate || '',                  // Alternate Date
      data.timeWindow || '',               // Time Window
      data.clientType || '',               // New/Returning
      data.firstName || '',                // First Name
      data.lastName || '',                 // Last Name
      data.email || '',                    // Email
      data.phone || '',                    // Phone
      data.streetAddress || '',            // Street Address
      data.city || '',                     // City
      data.state || '',                    // State
      data.zip || '',                      // Zip
      data.reason || '',                   // Reason for Visit
      data.referral || '',                 // How They Heard
      data.notes || '',                    // Additional Notes
      'Pending'                            // Status (for tracking)
    ]);

    // Send notification email to Unwind
    try {
      MailApp.sendEmail({
        to: 'unwindmn@gmail.com',
        subject: 'New Booking Request: ' + data.firstName + ' ' + data.lastName + ' - ' + data.service,
        htmlBody:
          '<h2>New Booking Request</h2>' +
          '<table style="border-collapse:collapse;width:100%;max-width:600px">' +
          '<tr style="background:#2C3E2D;color:#C9A84C"><td colspan="2" style="padding:12px;font-size:18px"><strong>Appointment Details</strong></td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Service</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.service + ' (' + data.duration + ')</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Location</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.location + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Preferred Date</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.date + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Alternate Date</td><td style="padding:8px;border-bottom:1px solid #eee">' + (data.altDate || 'N/A') + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Time Window</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.timeWindow + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Client Type</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.clientType + '</td></tr>' +
          '<tr style="background:#2C3E2D;color:#C9A84C"><td colspan="2" style="padding:12px;font-size:18px"><strong>Client Info</strong></td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.firstName + ' ' + data.lastName + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.email + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">' + data.phone + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Address</td><td style="padding:8px;border-bottom:1px solid #eee">' + (data.streetAddress ? data.streetAddress + ', ' + data.city + ', ' + data.state + ' ' + data.zip : 'N/A') + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Reason</td><td style="padding:8px;border-bottom:1px solid #eee">' + (data.reason || 'N/A') + '</td></tr>' +
          '<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Referral</td><td style="padding:8px;border-bottom:1px solid #eee">' + (data.referral || 'N/A') + '</td></tr>' +
          '<tr><td style="padding:8px;font-weight:bold">Notes</td><td style="padding:8px">' + (data.notes || 'N/A') + '</td></tr>' +
          '</table>'
      });
    } catch(emailErr) {
      Logger.log('Email failed: ' + emailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success', message: 'Unwind booking endpoint is active.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this once to set up the header row
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1, 1, 21).setValues([[
    'Timestamp', 'Service', 'Duration', 'Location', 'Location Address',
    'Preferred Date', 'Alternate Date', 'Time Window', 'Client Type',
    'First Name', 'Last Name', 'Email', 'Phone',
    'Street Address', 'City', 'State', 'Zip',
    'Reason for Visit', 'Referral Source', 'Notes', 'Status'
  ]]);
  sheet.getRange(1, 1, 1, 21).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
