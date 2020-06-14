function getData(id, sheetName) {
  var sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  var keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    // 中身が空のオブジェクトobjを作成
    var obj = {}
    // rowsで取得したss内のデータを配列化してobjに格納する
    row.map(function(item, index) {
    obj[keys[index]] = item;
  });
  return obj;
  });
}

function doGet(request) {
  var func = '';
  var ss_folder_id = "1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i";                    // ss_from_csvフォルダのID
  var target_file = getNewestFile(ss_folder_id);
  var ssID = target_file.getId();
  var ssSheetName = 'top3'
  var data = getData( ssID , ssSheetName );
  return ContentService.createTextOutput(func + JSON.stringify(data, null, 2))
  .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// idからフォルダ内で一番新しいファイルを取得
function getNewestFile(id){
  var files = getFilesArray(id);       // idからフォルダ内のファイルを配列で取得
  files = files.sort(SortfileByDate);  // ファイルを新しい順に並び替える
  return files[0];
}

// idからフォルダ内のファイルを配列で取得(https://qiita.com/elecho1/items/c596754c5dfa9f687a61)
function getFilesArray(id){
  var files = [];
  var files_itr = DriveApp.getFolderById(id).getFiles();   // 指定フォルダ内のファイルをイテレータ形式で一括取得
  
  // 取得したファイルをイテレータからひとつずつ取得する(イテレータのままではファイルを操作できないため)
  while (files_itr.hasNext()) {        // files.hasNext() →取得したイテレータファイルの中で、未処理のファイルがあるかどうかを判別
    var file = files_itr.next();       // file.next() で次のファイルが返ってくる
    files.push(file);
  }
  return files;
}

// ファイルを新しい順に並び替える
function SortfileByDate(f1, f2){
  if(f1.getLastUpdated() > f2.getLastUpdated()) return -1;
  if(f1.getLastUpdated() < f2.getLastUpdated()) return 1;
  return 0;
}

/*
  spliceメソッド
    Arrayオブジェクト.splice(配列番号, 削除する要素数, 追加する要素1, 追加する要素2, …)
    ・指定の配列番号の位置について
    ・削除する要素数分の要素を削除しつつ
    ・追加する要素1,追加する要素2,…を追加する（省略可能）
  
  mapメソッド
    処理をして新しい配列を作る
*/