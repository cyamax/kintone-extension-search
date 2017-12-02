//変数宣言
var textform, kintone_search, utfen ;
var main_url, url;
var command, command0, command1, command2, command3, command4;
var detail1, detail2, detail3, detail4;

//検索関数
function str_move(){
  textform = document.forms.form1.elements.text1.value; //フォームから取得した値
  if ((event.keyCode == 13)&&(textform != "")){ //EnterKeyが押されたときに実行
    if (main_url == "") {
      alert("基本検索が設定されていません。オプションから設定して下さい。");
      return;
    };
    var textraw = textform;
    for (var i = 0; i < url.length; i++){  //
      if (textform.match(new RegExp("^" + command[i] +" ")) && command[i] != "") { //
        //alert("一致");
        textform=textform.replace(command[i]+" ","");//コマンド文字を消す
        utfen= encodeURI(textform);//入力された文字をエンコードする
        url[i] = url[i].replace(new RegExp("xxxx","g"),textform); //URLのxxxx部分を検索文字に置換
        kintone_search=url[i];
      break;
      };

      if (i == url.length-1){ //コマンドと一致しない場合
        //alert("不一致");
        utfen= encodeURI(textform);
        main_url = main_url.replace(new RegExp("xxxx","g"),textform);
        kintone_search=main_url;
        break ;
      }
    }
  //検索内容を保存
  command_save(textraw,kintone_search);
  window.open(kintone_search, '_blank'); // 新しいタブを開き、ページを表示
  }
}

window.document.onkeydown = str_move; //キーが押されたら実行

function restore_options() {
  chrome.storage.sync.get({
    url     : '', //kintone
    url0    : '', //基本検索URL
    
    command1: '', //コマンド
    detail1 : '', //説明
    url1    : '', //コマンド利用時のURL1
    
    command2: '',
    detail2 : '',
    url2    : '',
    
    command3: '',
    detail3 : '',
    url3    : '',
    
    command4: '',
    detail4 : '',
    url4    : ''
    
  }, function(items) {
    kintone_url = items.url;
    main_url = items.url0 ;
    url = [ items.url1 , items.url2 , items.url3 , items.url4 ];
    command = [ items.command1 , items.command2 , items.command3 ,items.command4 ];
    detail  = [ items.detail1 , items.detail2 , items.detail3 , items.detail4 ];
    
    //検索フォームにコマンドを表示
    for (var i= 0; i < 4;i++){
      $('.rounded-list').append('<li class="command"><a href="#">' + command[i] + ' : ' + detail[i] + '</a></li>');
    }

    var buttons = document.querySelectorAll("li");
    //console.log(buttons);
    for (var i = 0, len = buttons.length; i < len; ++i) {
      buttons[i].dataset.num = i;
      buttons[i].addEventListener("click", onButtonClick);
    }
    
    function onButtonClick () {
      document.form1.text1.value = command[this.dataset.num] + " ";
      document.form1.text1.focus();
    }
    //menu
    $('#right_home').attr('href','https://'+kintone_url+'.cybozu.com/k/#/portal/')
    $('#right_bell').attr('href','https://'+kintone_url+'.cybozu.com/k/#/ntf/mention/')
    //hostnameの入力が無い場合アイコンを表示しない
    if (kintone_url == '') {
      $('#right_home').css('display','none');
      $('#right_bell').css('display','none');
    }
  });
}

//履歴取得
chrome.storage.local.get(function(value){
  if (typeof(value.data) != 'undefined') {
    var history_url = value.data;
    for (var i = 0;i < history_url.length ;i++){
      $('.rounded-history').append('<a target="_blank" href="'+history_url[i][2]+'"><div class="app_history"><img class="app_img" src="'+history_url[i][3]+'"><li class="app_label">'+history_url[i][1]+'</li><div></a>');
    };
  } else {
    var show_message="履歴はありません";
    $('#history_list').text(show_message)
  };
  // histroy_link
});
//履歴取得終わり


/////コマンド履歴保存
function command_save(textform,kintone_search){
  //サイトアクセス時間
  var command_data = [];
  var date = new Date() ;
  var unixTimestamp = Math.floor( date.getTime() / 1000 ) ;
  //検索値をchromeに保存
  var command_mod=([unixTimestamp, textform, kintone_search]);
  
  chrome.storage.local.get('command_data',function(value){
    
  if (typeof(value.command_data) != 'undefined') {command_data = value.command_data};


  for (var i = 0;i < command_data.length ;i++){
    if (command_data[i][1] == command_mod[1]){
      console.log("削除前",command_mod);
      command_data.splice(i,1);
      console.log("削除後",command_mod);
      i--;
    }
       //console.log(history_url[i][2]);
  };

    //追加(先頭に追加)
    command_data.unshift(command_mod); //先頭に追加

    //11件以上の場合、一番古いレコードを消して6件にする
    if (command_data.length > 6){
      console.log("over");
      command_data.splice(6,command_data.length-6);
    };

    var save_data = {'command_data':command_data};
    chrome.storage.local.set(save_data, function () {
      console.log("save");
    });
  });
};



//コマンド履歴取得
var history_command = []; //chrome.storageから持ってきたurl情報各種
chrome.storage.local.get(function (value) {
  if (typeof (value.command_data) != 'undefined') {
    history_command = value.command_data;
    for (var i = 0; i < history_command.length; i++) {
      var date = new Date( history_command[i][0] * 1000 );
      $('.rounded-command').append('<a target="_blank" href="' + history_command[i][2] + '"><li class ="command">' + history_command[i][1] + '</li></a>');
    };
  } else {
    var show_message = "履歴はありません";
    $('#history_list').text(show_message);
  };
});

document.addEventListener('DOMContentLoaded', restore_options); //htmlが読み込み終わったら実行
