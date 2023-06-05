const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/11p-LlW01-qgw_uzAxfqONnw7UzVRCf8k75P2vxz-V4E/edit#gid=0");
 //if you have changed your sheet name then replace the below Sheet1 with your sheet name
const sheet = sheets.getSheetByName("Form Answers");

function doInsertData(data){
  if(data.Name && data.Email && data.Message){
    sheet.appendRow([data.Name,data.Email,data.Message]);
    return ContentService.createTextOutput(`Your message was successfully sent to the Googlesheet database!, name: ${data.Name},email: ${data.Email},message: ${data.Message}`);
  }
  return ContentService.createTextOutput("Error");
}

function doGet(){
  return HtmlService.createTemplateFromFile("index").evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}