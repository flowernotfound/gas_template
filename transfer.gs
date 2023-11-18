// テンプレート
function calc_format(sheet_name, sales, resev) {
  const spreadsheet = SpreadsheetApp.openById("");
  const sheet = spreadsheet.getSheetByName(sheet_name);
  const summarySheet = spreadsheet.getSheetByName("合計");
  let range = sheet.getDataRange();
  let values = range.getValues();
  let summaryRange = summarySheet.getDataRange();
  let summaryValues = summaryRange.getValues();
  // 11月
  for (let day = 10; day <= 30; day++) {
    let specificDate = new Date(2023, 10, day);
    let count = 0;
    let totalAmount = 0;
    values.forEach(function (row) {
      let date = row[5]; // F列
      let amount = row[25]; // Z列
      if (date instanceof Date && date.getTime() === specificDate.getTime()) {
        count++;
        totalAmount += amount;
      }
    });
    summaryValues.forEach(function (row, index) {
      let summaryDate = row[2]; // C列
      if (
        summaryDate instanceof Date &&
        summaryDate.getTime() === specificDate.getTime()
      ) {
        summarySheet.getRange(index + 1, sales).setValue(totalAmount); // D列
        summarySheet.getRange(index + 1, resev).setValue(count); // E列
      }
    });
  }
  // 12月
  for (let day = 1; day <= 31; day++) {
    let specificDate = new Date(2023, 11, day);
    let count = 0;
    let totalAmount = 0;
    values.forEach(function (row) {
      let date = row[5]; // F列
      let amount = row[25]; // Z列
      if (date instanceof Date && date.getTime() === specificDate.getTime()) {
        count++;
        totalAmount += amount;
      }
    });
    summaryValues.forEach(function (row, index) {
      let summaryDate = row[2]; // C列
      if (
        summaryDate instanceof Date &&
        summaryDate.getTime() === specificDate.getTime()
      ) {
        summarySheet.getRange(index + 1, sales).setValue(totalAmount); // D列
        summarySheet.getRange(index + 1, resev).setValue(count); // E列
      }
    });
  }
}
