// Saves options to chrome.storage
function save_options() {
  var url_kintone = document.getElementById('option_kintone').value;
  var url0 = document.getElementById('url0').value;
  var command1 = document.getElementById('command1').value;
  var detail1 = document.getElementById('detail1').value;
  var url1 = document.getElementById('url1').value;
  var command2 = document.getElementById('command2').value;
  var detail2 = document.getElementById('detail2').value;
  var url2 = document.getElementById('url2').value;
  var command3 = document.getElementById('command3').value;
  var detail3 = document.getElementById('detail3').value;
  var url3 = document.getElementById('url3').value;
  var command4 = document.getElementById('command4').value;
  var detail4 = document.getElementById('detail4').value;
  var url4 = document.getElementById('url4').value;

  chrome.storage.sync.set({
    url : url_kintone,
    url0    : url0,
    command1: command1,
    detail1 : detail1,
    url1    : url1,
    command2: command2,
    detail2 : detail2,
    url2    : url2,
    command3: command3,
    detail3 : detail3,
    url3    : url3,
    command4: command4,
    detail4 : detail4,
    url4    : url4

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    url    : '',
    url0    : '',
    command1: '',
    detail1 : '',
    url1    : '',
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
    document.getElementById('option_kintone').value  = items.url;
    document.getElementById('url0').value     = items.url0;
    document.getElementById('command1').value = items.command1;
    document.getElementById('detail1').value  = items.detail1;
    document.getElementById('url1').value     = items.url1;
    document.getElementById('command2').value = items.command2;
    document.getElementById('detail2').value  = items.detail2;
    document.getElementById('url2').value     = items.url2;
    document.getElementById('command3').value = items.command3;
    document.getElementById('detail3').value  = items.detail3;
    document.getElementById('url3').value     = items.url3;
    document.getElementById('command4').value = items.command4;
    document.getElementById('detail4').value  = items.detail4;
    document.getElementById('url4').value     = items.url4;

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);