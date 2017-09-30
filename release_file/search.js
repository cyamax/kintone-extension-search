//変数宣言
var textform, kintone_search, utfen ;
var url, url0, url1, url2, url3, url4;
var command, command0, command1, command2, command3, command4;
var detail1, detail2, detail3, detail4;

//検索関数
function str_move(){
  if (event.keyCode == 13){ //EnterKeyが押されたときに実行
    textform = document.forms.form1.elements.text1.value; //フォームから取得した値
    url = [url0, url1, url2, url3, url4];
    command = [command0 ,command1, command2, command3, command4];

    for (var i = 1; i < url.length; i++){  //
      if (textform.match(new RegExp("^" + command[i] +" ")) && command[i] != "") { //
        //alert("一致");
        textform=textform.replace(command[i]+" ","");//コマンド文字を消す
        utfen= encodeURI(textform);//入力された文字をエンコードする
        url[i] = url[i].replace(new RegExp("xxxx","g"),textform); //URLのxxxx部分を検索文字に置換する
        kintone_search=url[i];
      break;
      };

      if (i == url.length-1){ //コマンドと一致しない場合
        //alert("不一致");
        utfen= encodeURI(textform);
        url[0] = url[0].replace(new RegExp("xxxx","g"),textform);
        kintone_search=url[0];
        break ;
      }
    }
  window.open(kintone_search, '_blank'); // 新しいタブを開き、ページを表示
  }
}

window.document.onkeydown = str_move; //キーが押されたら実行

function restore_options() {
  chrome.storage.sync.get({
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
    url = [ items.url1 , items.url2 , items.url3 , items.url4 ];
    command = [ items.command1 , items.command2 , items.command3 ,items.command4 ];
    detail  = [ items.detail1 , items.detail2 , items.detail3 , items.detail4 ];

    //検索フォームにコマンドを表示
    for (var i= 0; i < 4;i++){
  $('#command').append('<li><a href="'+ url[i] +'">' + command[i] + ' : ' + detail[i] + '</a></li>');
    }
   // document.getElementById("code1").value=command1+" ";
       // document.getElementById("code1")=detail1;
   // document.getElementById("code2").value=command2+" ";
   // document.getElementById("code2").label=detail2;
   // document.getElementById("code3").value=command3+" ";
   // document.getElementById("code3").label=detail3;
   // //document.getElementById("code4")=command4+" ";
    var code = document.getElementById("code4");
    code.innerHTML ="aaa";

  });
}

document.addEventListener('DOMContentLoaded', restore_options); //htmlが読み込み終わったら実行
