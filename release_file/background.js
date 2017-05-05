//変数宣言
var textform, kintone_search, utfen ;
var url, url0, url1, url2, url3, url4;
var command, command0, command1, command2, command3, command4;
var detail="", detail1="", detail2="", detail3="", detail4="";

function restore_options() {
  chrome.storage.sync.get(function(items) {
		conmenu(items);
	});
};

//chrome.runtime.onInstalled.addListener(function () {
  restore_options();
//});



function conmenu(items){
  //設定
  url = [items.url0, items.url1, items.url2, items.url3, items.url4];
  detail = ["基本検索", items.detail1, items.detail2, items.detail3, items.detail4];

  //親のコンテキストメニュー
	chrome.contextMenus.create({
		"title": 'kintoneで検索　「%s」', //%sには選択文字が入る
		"contexts": [ "selection" ],
		"id" : "parent_menu"
	});

  //子のコンテキストメニュー
	for (var i = 0; i < url.length; i++){  //コンテキストメニューを追加
    if (url[i] != ""){ //オプションのurlに記入があるもののみコンテキストに表示
      if (detail[i] == null){ //説明欄が空白の場合「未記入」を表示。定義しないとundefinedが表示されるのを回避
        detail[i] ="未記入";
      };
      chrome.contextMenus.create({
        "id": ""+i,
        "title": detail[i]+" ",
        "contexts": [ "selection" ],//どの表示要素上で表示するか
        "parentId": "parent_menu",//どの親の下につけるか
//        "onclick" : function(info,tab){onclickmenu(info,tab)}
      });
    }
	}

  //メニュー内の横棒(separator)
	chrome.contextMenus.create({
	"type" : "separator", //コンテキストメニューのタイプ ["normal", "checkbox", "radio", "separator"]
  "contexts": [ "selection" ],
  "parentId": "parent_menu",
  "id": "child_menu_5"
  });

  //ヘルプページ
  chrome.contextMenus.create({
  "title": "ヘルプ",
  "contexts": [ "selection" ],
  "parentId": "parent_menu",
  "id": "child_menu_6"
  });
}

//クリックされたときのコールバック
//function onclickmenu(info,tab){
chrome.contextMenus.onClicked.addListener( function(info,tab){
  kintone_search = url[Number(info.menuItemId)].replace(new RegExp("xxxx","g"),info.selectionText);
  chrome.tabs.create({url: kintone_search });
});
