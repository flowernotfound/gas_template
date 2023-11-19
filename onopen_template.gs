function onOpen() {
  let ui = SpreadsheetApp.getUi();
  let menu = ui.createMenu("メニュー");
  menu.addItem("", "").addItem("", "").addSeparator().addItem("", "");
  menu.addToUi();
}
