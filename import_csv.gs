// テンプレート 単体
function importCsv(CSV_name, sheet_name) {
  let fileName = CSV_name;
  let spreadsheet = SpreadsheetApp.openById("");
  let sheet = spreadsheet.getSheetByName(sheet_name);
  let files = DriveApp.getFilesByName(fileName);
  if (files.hasNext()) {
    let file = files.next();
    let csvData = Utilities.parseCsv(
      file.getBlob().getDataAsString("Shift_JIS")
    );
    sheet.clear();
    sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
  } else {
    Logger.log("not found: " + fileName);
  }
}

// テンプレート 結合
function importCombinedCSV(CSV_name01, CSV_name02, sheet_name) {
  let fileNames = [CSV_name01, CSV_name02];
  let spreadsheet = SpreadsheetApp.openById("");
  let sheet = spreadsheet.getSheetByName(sheet_name);
  let combinedData = [];
  let isFirstFile = true;
  fileNames.forEach(function (fileName) {
    let files = DriveApp.getFilesByName(fileName);
    if (files.hasNext()) {
      let file = files.next();
      let csvData = Utilities.parseCsv(
        file.getBlob().getDataAsString("Shift_JIS")
      );
      if (isFirstFile) {
        combinedData = combinedData.concat(csvData);
        isFirstFile = false;
      } else {
        // ヘッダー除外
        combinedData = combinedData.concat(csvData.slice(1));
      }
    } else {
      Logger.log("not found: " + fileName);
    }
  });
  if (combinedData.length > 0) {
    sheet.clear();
    sheet
      .getRange(1, 1, combinedData.length, combinedData[0].length)
      .setValues(combinedData);
  }
}
