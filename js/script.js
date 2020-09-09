$(document).ready(function () {

  // EFFETTO HOVER UTENTI
  $(".user_n_im_i").mouseover(
    function () {
      $(this).addClass("bgcolor_grey");
    }
  );
  $(".user_n_im_i").mouseleave(
    function () {
      $(this).removeClass("bgcolor_grey");
    }
  );
  // $(".user_n_im_i").click(
  //   function () {
  //     var userImg = $(".name_user > img").clone();
  //     userImg.find(".user_info .img_user > img").text();
  //
  //     var nomeCopy = $("name_user_n_lastmsg > h4").text();
  //     var userName = $(".user_info .img_user > .user_name").clone();
  //     userName.find(".user_info .img_user > .user_name").text(nomeCopy);
  //   }
  // );

  // AL CLICK SULLA INPUT MSG VISUALIZZO "BUTTON" INVIO E RIMUOVO "BUTTON" MICROFONO
  $(".msg_wrtn").click(
    function () {
      $(".fas.fa-microphone").addClass("d_none");
      $(".fas.fa-paper-plane").removeClass("d_none");
    }
  );

  // AL CLICK SUL "BUTTON" INVIO, INVIO IL MIO MESSAGGIO
  $(".fas.fa-paper-plane").click(
    function () {
      sendMessage();
      setTimeout(receiveMessage, 2000);
      $(".fas.fa-microphone").removeClass("d_none");
      $(".fas.fa-paper-plane").addClass("d_none");
    }
  );

  // AL CLICK SUL TASTO INVIO (TASTIERA), INVIO IL MIO MESSAGGIO
  $(".msg_wrtn").keydown(
    function(e) {
      if (e.which == 13) {
        sendMessage();
        setInterval(isWriting, 0000);
        setTimeout(receiveMessage, 2000);
        clearTimeout();
      }
    }
  );

  // RICERCA UTENTI
  $(".input_searching").on("keyup",
    function () {
      var valueSearch = $(".input_searching").val().toLowerCase();
      $(".users_list .user_n_im_i").filter(
        function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(valueSearch) > -1)
        });
    }
  );



  // FUNCTIONS
    // function setting orario completo
  function time () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (minutes < 10) {
      var time = hours + ":" + "0" +  minutes;
    } else {
      var time = hours + ":" + minutes;
    }
    return time;
  }

    // function setting invio messaggio utente
  function sendMessage () {
    var inputUtente = $(".msg_wrtn").val();
    if (inputUtente.length != "") {
      var templateMessage = $(".templates .msg_row").clone();
      templateMessage.find(".msg_text").text(inputUtente);
      templateMessage.find(".hour_send").text(time());
      templateMessage.find(".msg_msg").addClass("msg_green");
      $(".chat").append(templateMessage);
      $(".msg_wrtn").val("");
    }
  }

    // function setting ricevi messaggio da parte dello user chat corrente
  function receiveMessage () {
    var receiveMsg = $(".templates .msg_row").clone();
    receiveMsg.find(".msg_text").text("Ok");
    receiveMsg.find(".hour_send").text(time());
    receiveMsg.find(".msg_msg").addClass("msg_white");
    $(".chat").append(receiveMsg);
  }

  function isWriting () {
    var writeAMessage = $(".user_is_writing");
    writeAMessage.find(".last_online").text("Sta scrivendo...");
  }

});

// FUNCTIONS
