const spawn = require("child_process").spawn;

var keywords = ['*NOME*', '*NOME*,', '*NOME*.', '*NOME*!', '*NOME*;', '*NOME*?'];

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

jQuery(function ($) {
  $("#editor").focusout(function () {
    var element = $(this);
    if (!element.text().replace(" ", "").length) {
      element.empty();
    }
  });
});

function submitForm() {
  // const form = document.getElementById('form');
  // console.log(form);
  const pythonProcess = spawn(api_config.python_path)
  pythonProcess.stderr.on('data', (data) => {
    console.log(`-------------- ERRO -----------------\n${data}`);
    throw 'Erro ao processar devolutiva'
  });

  pythonProcess.on('close', (code) => {
    console.log(`--------------- SERVIÇO CONCLUÍDO ---------------------\nCÓDIGO: ${code}`);
  });
}

function goPython() {
  $.ajax({
    url: "./scripts/send-menssages.py",
    context: document.body
  }).done(function () {
    alert('Envio de mensagens concluido!');
  });
}