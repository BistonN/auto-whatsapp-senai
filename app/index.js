const spawn = require('child_process').spawn;
var keywords = ['*NOME*', '*NOME*,', '*NOME*.', '*NOME*!', '*NOME*;', '*NOME*?'];
var $ = require('jquery');
var pythonExecutable = "/bin/python3";

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
  // let chromeVersion = Array.from(document.getElementsByName('chrome-version'));
  // chromeVersion = chromeVersion.filter(v => v.checked);

  // const file = document.getElementById('formFileLg').value;

  // let menssage = Array.from(document.querySelectorAll('#editor span'));
  // menssage = menssage.map(m => { return m.innerHTML.replace('&nbsp;', '') }).join(' ');

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

  callSelenium();
}

function callSelenium() {
  var uint8arrayToString = function (data) {
    return String.fromCharCode.apply(null, data);
  };

  const scriptExecution = spawn(pythonExecutable, ['./scripts/send-menssages.py']);

  // Handle normal output
  scriptExecution.stdout.on('data', (data) => {
    console.log(uint8arrayToString(data));
  });

  // Handle error output
  scriptExecution.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
  });

  scriptExecution.on('exit', (code) => {
    console.log("Process quit with code : " + code);
  });
}

