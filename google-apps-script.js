// ============================================
// Google Apps Script — Unwind Class Registration
// Paste this into Google Sheets > Extensions > Apps Script
// Then Deploy as Web App
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var data = e.parameter;

    sheet.appendRow([
      new Date(),                          // Timestamp
      data.firstName || '',                // First Name
      data.lastName || '',                 // Last Name
      data.email || '',                    // Email
      data.phone || '',                    // Phone
      data.street || '',                   // Street Address
      data.city || '',                     // City
      data.state || '',                    // State
      data.zip || '',                      // Zip
      data.classSelection || '',           // Class Selected
      data.credentials || '',              // Professional Credentials
      data.howHeard || '',                 // How They Heard About Us
      data.questions || ''                 // Questions/Notes
    ]);

    // Send confirmation email to business
    try {
      MailApp.sendEmail({
        to: 'unwindmn@gmail.com',
        subject: 'New Class Registration: ' + data.firstName + ' ' + data.lastName,
        htmlBody: '<h2>New Class Registration</h2>' +
          '<p><strong>Name:</strong> ' + data.firstName + ' ' + data.lastName + '</p>' +
          '<p><strong>Email:</strong> ' + data.email + '</p>' +
          '<p><strong>Phone:</strong> ' + data.phone + '</p>' +
          '<p><strong>Address:</strong> ' + data.street + ', ' + data.city + ', ' + data.state + ' ' + data.zip + '</p>' +
          '<p><strong>Class:</strong> ' + data.classSelection + '</p>' +
          '<p><strong>Credentials:</strong> ' + data.credentials + '</p>' +
          '<p><strong>How Heard:</strong> ' + data.howHeard + '</p>' +
          '<p><strong>Questions:</strong> ' + data.questions + '</p>'
      });
    } catch(emailErr) {
      // Email sending failed but data was saved — that's OK
      Logger.log('Email notification failed: ' + emailErr);
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
    .createTextOutput(JSON.stringify({ result: 'success', message: 'Unwind registration endpoint is active.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
