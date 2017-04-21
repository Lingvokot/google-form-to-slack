function Initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  //Set a trigger when the form updates the spreadsheet to call our Slack notification function
  ScriptApp.newTrigger("CreateMessage")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
  
}
 
function CreateMessage(e){
  try {
    var spreadsheet, columns;
    var my_message = "";
 
    //fetch the column names
    spreadsheet = SpreadsheetApp.getActiveSheet();
    columns = spreadsheet.getRange(1, 1, 1, spreadsheet.getLastColumn()).getValues()[0];
 
    // Only include form values that are not blank
    for (var keys in columns) {
    var key = columns[keys];
      var val = e.namedValues[key] ? e.namedValues[key].toString() : "";
      if (val !== "") {
        my_message +=key + ' :: ' + val + '\n';
      } else {
        my_message +=key + ' :: ' + "<null>" + '\n';
      }
    }
    SendSlackMessage(my_message);
 
  } catch (e) {
    Logger.log(e.toString());
  }
}
 
function TestSlack(){
  SendSlackMessage("testing my stuff"); 
}
 
function SendSlackMessage(message){
var url = "FULLFILL IT";
   
  var payload =
      {
        "as_user" :"false",
        "text" : "New form submit",
        "attachments" : [{"text": message}],
        "type" : "post",
      };
   
  var options =
      {
        "method"  : "post",
        "payload" : 'payload=' + JSON.stringify(payload),   
//        "followRedirects" : false,
//        "muteHttpExceptions": true
      };
   
  var result = UrlFetchApp.fetch(url, options);
  
  Logger.log(result);
}
