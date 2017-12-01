var history_url = [];

function rireki() {
    //kintoneのサイト情報を取得
    //サイトurl
    var $dir = location.href.split("/");
    var url = "https://" + $dir[2] +"/" + $dir[3] + "/" + $dir[4] + "/";
    //サイトタイトル(chrome.historyでは取得できないため)
    var title = document.title;
    //ファビコンURL
    //favicon画像のurlはhtml内のhead->linkタグの属性relがshortcut iconのhref値に記載れている
    for (var i = 0;i < document.head.getElementsByTagName('link').length ;i++){
      if (document.head.getElementsByTagName('link')[i].getAttribute('rel') === "shortcut icon"){
        var favicon_url = document.head.getElementsByTagName('link')[i].getAttribute('href');
        //標準以外のアップロードしたアイコンはurlが違うため整形が必要
        if (favicon_url.indexOf('cybozu.com') == -1) {
          favicon_url = "https://" + location.hostname + favicon_url;
          //ファビコンのアイコンをそのまま使うと画像サイズが小さいのでクエリ内の文字を置換
          favicon_url = favicon_url.replace('FAVICON','NORMAL'); 
        };
        break;
      } else {
        var favicon_url = '';
      }
    };
    //サイトアクセス時間
    var date = new Date() ;
    var unixTimestamp = Math.floor( date.getTime() / 1000 ) ;
    
    console.log(url,title,favicon_url);
    
    //サイト情報をchromeに保存
    history_mod([unixTimestamp, title, url, favicon_url]);
  };
  


/////履歴管理
function history_mod(active_url){
    chrome.storage.local.get('data',function(value){
      console.log(value.data );
      if (typeof(value.data) != 'undefined') {history_url = value.data};
      for (var i = 0;i < history_url.length ;i++){
        if (history_url[i][2] == active_url[2]){
          console.log("削除前",history_url);
          history_url.splice(i,1);
          console.log("削除後",history_url);
          i--;
        }
        //console.log(history_url[i][2]);
      };
  
      //追加(先頭に追加)
      history_url.unshift(active_url); //先頭に追加
  
      //11件以上の場合、一番古いレコードを消して10件にする
      if (history_url.length > 10){
        console.log("over");
        history_url.splice(10,history_url.length-10);
      };
  
      var save_data = {'data':history_url};
      chrome.storage.local.set(save_data, function () {
        console.log("save");
      });
    });
  };


  window.setTimeout("rireki()",1000);