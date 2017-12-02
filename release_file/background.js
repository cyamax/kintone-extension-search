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







//初期設定
var history_url = [];
//chrome.browserAction.setIcon({path:'off.png'});

function change_popup(tabid){
  chrome.tabs.get(tabid, function(tab){
    //console.log(tab.url);
    //backlogだけすスライドが作れるようにする
    //if (tab.url.match(/\.backlog\.(jp|com)\/wiki\//)) {
    //  chrome.browserAction.setIcon({'path':'on.png'});
    //  chrome.browserAction.setPopup({'popup':''}); //あえて空白。新規タブで表示させるために空白
    //} else {
      //backlog以外のとき
    //  chrome.browserAction.setIcon({'path':'off.png'});
    //  chrome.browserAction.setPopup({'popup':'test.html'});
    //}
  });
};



chrome.tabs.onActiveChanged.addListener(function(tabid){ //タブが切り替わったら実行
  change_popup(tabid);
});


//開いているタブが更新したら
chrome.tabs.onUpdated.addListener(function(tabid){  //ページが更新されたら実行
  change_popup(tabid);
});


//クリックされたときのコールバック
//function onclickmenu(info,tab){
chrome.contextMenus.onClicked.addListener( function(info,tab){
  kintone_search = url[Number(info.menuItemId)].replace(new RegExp("xxxx","g"),info.selectionText);
  chrome.tabs.create({url: kintone_search });
});


//現在アクティブなページがbacklogのとき & setpopupが空白のときにのみ有効
// setpopupが既に設定されている場合、onClicked.addListenerはchromeの仕様により無効化される
chrome.browserAction.onClicked.addListener(function(tab) {
  alert("aaa");
  var date = new Date() ;
  var unixTimestamp = Math.floor( date.getTime() / 1000 ) ;
  var active_url= Array(3);  //現在開いているurl情報を入れる
  //var history_url = Array(11); //過去の履歴
  active_url = [unixTimestamp, tab.title, tab.url]; //保存時間、urlタイトル,url
  //history_url = [active_url, active_url];

  history_mod(active_url);

//  var urldata = {'time':history_url,'key': tab.url,'title':tab.title};

  //chrome.tabs.create({'url':'slide_page.html'});
});


