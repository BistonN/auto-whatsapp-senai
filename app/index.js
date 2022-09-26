const spawn = require('child_process').spawn;
var keywords = ['*NOME*', '*NOME*,', '*NOME*.', '*NOME*!', '*NOME*;', '*NOME*?'];
var $ = require('jquery');
// var pythonExecutable = "../sendMenssages/bin/python3";
var pythonExecutable = './extraResources/sendMenssages/Python310/python.exe';

$('#editor').on('keyup', function (e) {
  if (e.keyCode == 32) {
    var newHTML = '';
    $(this).text().replace(/[\s]+/g, ' ').trim().split(' ').forEach(function (val) {
      if (keywords.indexOf(val.trim().toUpperCase()) > -1)
        newHTML += '<span class="statement">' + val + '&nbsp;</span>';
      else
        newHTML += '<span class="other">' + val + '&nbsp;</span>';
    });
    $(this).html(newHTML);

    var child = $(this).children();
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(child[child.length - 1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    this.focus();
  }
});

$(function ($) {
  $("#editor").focusout(function () {
    var element = $(this);
    if (!element.text().replace(" ", "").length) {
      element.empty();
    }
  });
});

function submitForm() {
  let chromeVersion = Array.from(document.getElementsByName('chrome-version'));
  chromeVersion = chromeVersion.filter(v => v.checked);

  const file = document.getElementById('formFileLg').files[0].path;

  let menssage = Array.from(document.querySelectorAll('#editor span'));
  menssage = menssage.map(m => { return m.innerHTML.replace('&nbsp;', '') }).join(' ');

  // if (chromeVersion.length === 0) {
  //   document.getElementsByClassName('modal-body')[0].innerHTML = `Selecione a versão de seu navegador google chrome. <br> Caso não saiba como ver a versão de seu navegador, acesse: <a target="_blank"
  //         href="https://screencorp.zendesk.com/hc/pt-br/articles/115001590211-Visualizando-a-vers%C3%A3o-do-Google-Chrome">como ver a versão do google chome?</a>`;
  //   $('#exampleModal').modal('toggle');
  //   return;
  // }

  // if (file.length === 0) {
  //   document.getElementsByClassName('modal-body')[0].innerHTML = `Voce deve subir um arquivo csv contendo os nomes e telefones dos contatos.`;
  //   $('#exampleModal').modal('toggle');
  //   return;
  // } else if (file.split('.')[file.split('.').length - 1] != 'csv') {
  //   document.getElementsByClassName('modal-body')[0].innerHTML = `O arquivo que deve estar no formato .csv`;
  //   $('#exampleModal').modal('toggle');
  //   return;
  // }

  // if (menssage.length === 0) {
  //   document.getElementsByClassName('modal-body')[0].innerHTML = `Você precisa digitar uma mensagem. Voce pode usar *nome* na mensagem quando quiser usar o nome do contato`;
  //   $('#exampleModal').modal('toggle');
  //   return;
  // }

  callSelenium(file, menssage, chromeVersion[0].value);
}
function callSelenium(file_path, menssage, chrome_version) {
  var uint8arrayToString = function (data) {
    return String.fromCharCode.apply(null, data);
  };

  //path = window.location.pathname.split('/app')[0] + '/scripts/send_menssages.py'

  console.log(String(chrome_version), pythonExecutable, file_path)
  const scriptExecution = spawn(pythonExecutable,
    ['./extraResources/scripts/send_menssages.py', file_path, menssage, String(chrome_version)]);

  scriptExecution.stdout.on('data', (data) => {
    console.log('pattern: ', data.toString());
  });

  scriptExecution.stderr.on('data', (data) => {
    console.error('err: ', data.toString());
  });

  scriptExecution.on('error', (error) => {
    console.error('error: ', error.message);
  });

  scriptExecution.on('close', (code) => {
    console.log('child process exited with code ', code);
  });
}
