// 最新のcsvファイルをssへ展開する
function doGet(){
  // ss_from_csvフォルダのURL：https://drive.google.com/drive/u/3/folders/1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i
  // ss_from_csvフォルダのID：1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i
  var dst_folder_id = "1BFC6bMZm-6SJSAP5EDaafyhKksnn2Y9i";                    // ss_from_csvフォルダのID
  var d = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
  var ssNewName = "ss_for_baba-" + d;
  var ssNew = createSpreadsheetInfolder(dst_folder_id, ssNewName);            // ()内の前がフォルダID、後ろがスプレッドシート名
  var ssNewID = ssNew.getId();                                                // IDを取得
  var ssNewFile = SpreadsheetApp.openById(ssNewID);                           // 作成したファイルを開く
  var activeSpreadsheet = SpreadsheetApp.setActiveSpreadsheet(ssNewFile);     // アクティブシートに設定，操作が有効なシート
  var main_ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterSheet = main_ss.getActiveSheet();   // アクティブシートを取得
  var src_folder_id = "19wRyAhdtHxSetL-QVQFw9mMoWi-8xoai";                    // csvフォルダのID
  var file = getNewestFile(src_folder_id);
  var data = file.getBlob().getDataAsString("Shift_JIS");    // csvファイルからテキストを取り出す
  var csv = Utilities.parseCsv(data);                        // csvテキストを二次元配列に変換する
  masterSheet.getRange(1,1,csv.length,csv[0].length).setValues(csv);
  main_ss.insertSheet("top3");   // 1～3着馬のみ抽出するシートを作成
  var top3Sheet = main_ss.getSheetByName("top3");

  // masterSheetの内容を取得
  var inventory = masterSheet.getDataRange().getValues()
    .filter(function(e){return e[9] < 4 && e[9] != 0})
    .map(function(e){
      var data_col = [0,1,2,3,4,5,6,7,8,9,10,11,12,13], row = [];
      for (var i = 0; i < data_col.length; i++) row.push(e[data_col[i]]);
      return row;
    });
  if (inventory.length) {
    top3Sheet.getRange(top3Sheet.getLastRow()+1, 1, inventory.length, inventory[0].length).setValues(inventory);
  }
  
  // ヘッダーを追加
  top3Sheet.insertRowBefore(1);
  var header_year = top3Sheet.getRange(1,1).setValue("year");
  var header_month = top3Sheet.getRange(1,2).setValue("month");
  var header_day = top3Sheet.getRange(1,3).setValue("day");
  var header_location = top3Sheet.getRange(1,4).setValue("location");
  var header_race = top3Sheet.getRange(1,5).setValue("race");
  var header_class = top3Sheet.getRange(1,6).setValue("class");
  var header_field = top3Sheet.getRange(1,7).setValue("field");
  var header_distance = top3Sheet.getRange(1,8).setValue("distance");
  var header_condition = top3Sheet.getRange(1,9).setValue("condition");
  var header_place = top3Sheet.getRange(1,10).setValue("place");
  var header_popular = top3Sheet.getRange(1,11).setValue("popular");
  var header_corner4 = top3Sheet.getRange(1,12).setValue("corner4");
  var header_pci = top3Sheet.getRange(1,13).setValue("pci");
  var header_number = top3Sheet.getRange(1,14).setValue("number");
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

// csv展開用ssを作成する
function createSpreadsheetInfolder(folderID, fileName){
  var folder = DriveApp.getFolderById(folderID);
  var ssNewName = SpreadsheetApp.create(fileName);
  var originalFile = DriveApp.getFileById(ssNewName.getId());
  var copiedFile = originalFile.makeCopy(fileName, folder);
  DriveApp.getRootFolder().removeFile(originalFile);
  return copiedFile;
}