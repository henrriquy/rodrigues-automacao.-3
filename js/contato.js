var contato = {};

$(function () {

  $("#contato").submit(function (event) {
    contato = {
      "name": $("#nome").val(),
      "email": $("#email").val(),
      "telephone": $("#telefone").val() + ' - ' + $("#celular").val(),
      "subject": 'Contato - Site Union',
      "message": $("#mensagem").val()
    }

    sendEmail();
    event.preventDefault();
  });

  function sendEmail() {
    $('#mensagemSucesso').hide();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://us-central1-rias-restaurante.cloudfunctions.net/sendEmail",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "data": JSON.stringify(getEmail())
    }

    $.ajax(settings).done(function (response) {
      $('#mensagemSucesso').show();
      $("#nome").val("");
      $("#email").val("");
      $("#telefone").val("");
      $("#celular").val("");
      $("#mensagem").val("");
    });
  }

  function getEmail() {
    const email = {
      sender: "Rodrigues Automação <contato@rodriguesautomacao.com.br>",
      subject: "Contato Site",
      to: 'henrique.developer.net@gmail.com;claudio@rodriguesautomacao.com.br',
      html: getEmailBody()
    }
    return email;
  }

  function getEmailBody() {
    let emailBody = "Mensagem enviada através do site rodriguesautomacao.com.br";
    emailBody += "<br /><br /><strong>Nome: </strong>" + contato.name;
    emailBody += "<br /><strong>E-mail: </strong>" + contato.email;
    emailBody += "<br /><strong>Telefone: </strong>" + contato.telephone;
    emailBody += "<br /><strong>Solicitação: </strong>" + contato.message;

    return emailBody;

  }
});