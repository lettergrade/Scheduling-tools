// Script to add in Google sheets, to grab the input and give back a CSS code, that would later be added to TamperMonkey

// Function that takes the input from the sheet and returns the code.
function myFunction(Id, timeZone) {
  
  //convert the ID to the ID used by Humanity
  var IdSelector = "#d_" + Id ; 
  
  //divide the input in two parts, leaving the second one with the plus or minus and the number (we'll only use the second one)
  var timeZone2 = timeZone.split(' ');
  var timeZone2 = timeZone2[1];
  var firstHour;
  
  if (timeZone2[0] === "+" ) {
    firstHour= timeZone2.slice(1);
    firstHour = 24 - firstHour;}
  
  
  
  else if ( timeZone2[0] === "-") {
    firstHour= timeZone2.slice(1);
  }
  
  else {firstHour= ""};
  
  var cellSelector = ".dcol" + firstHour+ IdSelector ;
  var CssCode = cellSelector + "{border: 5px solid #4a9abd !important;}"; 
  
  return CssCode;
  
  
}



function loop(){
  // This part gets the information from the current document and cells
  var app = SpreadsheetApp; 
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  //Check how many filled rows are in the document
  var numRows = activeSheet.getLastRow();
  var activeRange = "A2:B" + numRows;
  var total = [];
  var loops = numRows;
  var range = activeSheet.getRange(activeRange)
  //Loop once for each row, to get the needed values, and input those values to the big function.
  for (i=1; i < loops ; i++) { 
    var Ai = range.getCell(i,1).getValues().toString();
    var Bi = range.getCell(i,2).getValues().toString();
    
    //Run the big function with the values of the row, and return the result
    total[i]= myFunction(Ai, Bi)
  }
  return total;
} 
