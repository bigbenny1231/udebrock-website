/**
 * Udebrock Family Finishes - Lead Management
 * Google Apps Script Backend
 * 
 * SETUP:
 * 1. Create Google Sheet "Udebrock Leads"
 * 2. Create Drive folder "Udebrock Project Photos"
 * 3. Update SHEET_ID and DRIVE_FOLDER_ID below
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 */

const SHEET_ID = "YOUR_SHEET_ID";
const DRIVE_FOLDER_ID = "YOUR_FOLDER_ID";
const NOTIFICATION_EMAIL = "agarretson14.ag@gmail.com";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const leadId = generateLeadId();
    data.leadId = leadId;
    
    logToSheet(data);
    
    if (data.images && data.images.length > 0) {
      saveImagesToDrive(data);
    }
    
    if (data.colorSelection && data.colorSelection.colorPreviewImage) {
      saveColorPreviewToDrive(data);
    }
    
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      leadId: leadId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function logToSheet(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Lead ID', 'Timestamp', 'Name', 'Email', 'Phone',
      'Project Type', 'Message', 'Primary Color', 'Secondary Color',
      'Stain Color', 'Needs Color Help', 'Status', 'Notes'
    ]);
    sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#4a6f54').setFontColor('#f5f1e8');
  }
  
  const colors = data.colorSelection || {};
  
  sheet.appendRow([
    data.leadId,
    new Date().toISOString(),
    data.name,
    data.email,
    data.phone || '',
    data.projectType,
    data.message,
    colors.primaryColor || '',
    colors.secondaryColor || '',
    colors.stainColor || '',
    colors.needsColorHelp ? 'YES' : 'No',
    'New',
    ''
  ]);
}

function saveImagesToDrive(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  
  // Format folder name: Name - Project Type - Phone Number
  // Clean phone number (remove spaces, dashes, parentheses for filename)
  let phoneClean = (data.phone || '').replace(/[\s\-\(\)]/g, '');
  if (!phoneClean) phoneClean = 'NoPhone';
  
  // Clean project type (remove spaces for filename)
  let projectTypeClean = (data.projectType || 'NoProject').replace(/\s+/g, '-');
  
  // Clean name (remove special characters that might cause issues in filenames)
  let nameClean = (data.name || 'NoName').replace(/[<>:"/\\|?*]/g, '');
  
  // Create folder name: Name - ProjectType - Phone
  const folderName = `${nameClean} - ${projectTypeClean} - ${phoneClean}`;
  
  const leadFolder = folder.createFolder(folderName);
  
  data.images.forEach((img, i) => {
    const base64 = img.split(',')[1] || img;
    const blob = Utilities.newBlob(Utilities.base64Decode(base64), 'image/jpeg', `image-${i+1}.jpg`);
    leadFolder.createFile(blob);
  });
}

function saveColorPreviewToDrive(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  let colorFolder;
  const folders = folder.getFoldersByName('Color Previews');
  colorFolder = folders.hasNext() ? folders.next() : folder.createFolder('Color Previews');
  
  const img = data.colorSelection.colorPreviewImage;
  const base64 = img.split(',')[1] || img;
  const blob = Utilities.newBlob(Utilities.base64Decode(base64), 'image/png', `${data.leadId}_preview.png`);
  const file = colorFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function sendNotificationEmail(data) {
  const colors = data.colorSelection || {};
  
  let subject = `🏡 New Lead: ${data.projectType}`;
  if (colors.primaryColor) subject += ' [Colors Selected]';
  if (colors.needsColorHelp) subject += ' [Needs SW Consultation]';
  
  const body = `
NEW LEAD - UDEBROCK FAMILY FINISHES
====================================
Lead ID: ${data.leadId}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Project: ${data.projectType}

Message:
${data.message}

COLORS:
Primary: ${colors.primaryColor || 'Not specified'}
Secondary: ${colors.secondaryColor || 'Not specified'}
Stain: ${colors.stainColor || 'Not specified'}
Needs Help: ${colors.needsColorHelp ? 'YES' : 'No'}
  `;
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function generateLeadId() {
  return `UDF-${Date.now().toString(36)}-${Math.random().toString(36).substr(2,4)}`.toUpperCase();
}

function testSetup() {
  logToSheet({
    leadId: generateLeadId(),
    name: 'Test User',
    email: 'test@example.com',
    projectType: 'Deck Staining',
    message: 'Test submission',
    colorSelection: { needsColorHelp: true }
  });
  Logger.log('✅ Test complete');
}
