/*
function ss_to_json(){
// 行ごとのヘッダー（データ名）を定義
    var year_col = "A";
    var month_col = "B";
    var day_col = "C";
    var location_col = "D";
    var race_col = "E";
    var class_col = "F";
    var field_col = "G";
    var distance_col = "H";
    var condition_col = "I";
    var place_col = "J";
    var popular_col = "K";
    var corner4_col = "L";
    var PCI_col = "M";
}
*/

function getData(id, sheetName) {
    var sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
    var rows = sheet.getDataRange().getValues();

    /*ここでヘッダーを取得する
        spliceメソッド
        Arrayオブジェクト.splice(配列番号, 削除する要素数, 追加する要素1, 追加する要素2, …)
            ・指定の配列番号の位置について
            ・削除する要素数分の要素を削除しつつ
            ・追加する要素1,追加する要素2,…を追加する（省略可能）
    */
    var keys = rows.splice(0, 1)[0];
    return rows.map(function(row) {
        var obj = {}
        row.map(function(item, index) {
        obj[keys[index]] = item;
    });
    return obj;
    });
}

function doGet(request) {
    var func = 'jsondata';
    var data = getData('https://docs.google.com/spreadsheets/d/1kxx6dnlY0CN-KGx92Rf-nYVskcG9udSGRLb8Xj76ezw/edit#gid=0', 'Sheet1');
    return ContentService.createTextOutput(func + '(' + JSON.stringify(data, null, 2) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
