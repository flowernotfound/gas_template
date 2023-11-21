//テンプレート
function calc_format(sheet_name, sales, resev) {
  const spreadsheet = SpreadsheetApp.openById(
    "1ULOWr2Af-szHgNTTiyRqUoZFILh5h5wk3yJqElU40p8"
  );
  const sheet = spreadsheet.getSheetByName(sheet_name);
  const summarySheet = spreadsheet.getSheetByName("合計");
  let range = sheet.getDataRange();
  let values = range.getValues();
  let summaryRange = summarySheet.getRange("C:C");
  let summaryValues = summaryRange.getValues();
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  summaryValues.forEach(function (row, index) {
    let summaryDate = row[0]; // C列
    if (summaryDate instanceof Date && summaryDate >= today) {
      let specificDate = new Date(summaryDate.getTime());
      let count = 0;
      let totalAmount = 0;
      values.forEach(function (dataRow) {
        let date = dataRow[6]; // G列
        let amount = dataRow[25]; // Z列
        if (date instanceof Date && date.getTime() === specificDate.getTime()) {
          count++;
          totalAmount += amount;
        }
      });
      summarySheet.getRange(index + 1, sales).setValue(totalAmount); // D列
      summarySheet.getRange(index + 1, resev).setValue(count); // E列
    }
  });
}
