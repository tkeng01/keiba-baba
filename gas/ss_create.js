//pushtest

function ss_create() {
  // ss_from_csvフォルダのURL：https://drive.google.com/drive/u/3/folders/1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i
  // ss_from_csvフォルダのID：1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i
  var ssNew = createSpreadsheetInfolder("1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i", "test2");//()内の前がフォルダID、後ろがスプレッドシート名
  var ssNewID = ssNew.getId();//IDを取得
  var ssNewFile = SpreadsheetApp.openById(ssNewID);//作成したファイルを開く
  var activeSpreadsheet = SpreadsheetApp.setActiveSpreadsheet(ssNewFile);//アクティブシートに設定，操作が有効なシート
  var masterSheet  = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];//アクティブシートを取得
}

function createSpreadsheetInfolder(folderID, fileName) {
  var folder = DriveApp.getFolderById(folderID);
  var ssNewName = SpreadsheetApp.create(fileName);
  var originalFile = DriveApp.getFileById(ssNewName.getId());
  var copiedFile = originalFile.makeCopy(fileName, folder);
  DriveApp.getRootFolder().removeFile(originalFile);
  return copiedFile;
}