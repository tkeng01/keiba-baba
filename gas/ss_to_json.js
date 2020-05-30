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
    var func = 'jsondata';
    var ssID = '1kxx6dnlY0CN-KGx92Rf-nYVskcG9udSGRLb8Xj76ezw'
    var ssSheetName = 'Sheet1'
    var data = getData( ssID , ssSheetName );
    return ContentService.createTextOutput(func + '(' + JSON.stringify(data, null, 2) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
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