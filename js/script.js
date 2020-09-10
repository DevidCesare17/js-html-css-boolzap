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

  $(".user_n_im_i").click(
    function () {
      // var userImg = $(".name_user > img").clone();
      // userImg.find(".user_info .img_user > img").text();

      $(this).clone(".name_user_n_lastmsg > h4");
      var userName = $(".name_user_n_lastmsg > h4");
      userName.find(".user_is_writing .user_name").text($(this));
    }
  );

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
      setTimeout(isWriting, 1000);
      setTimeout(receiveMessage, 2000);
      setTimeout(lastAccess, 2500);
      $(".fas.fa-microphone").removeClass("d_none");
      $(".fas.fa-paper-plane").addClass("d_none");
    }
  );

  // AL CLICK SUL TASTO INVIO (TASTIERA), INVIO IL MIO MESSAGGIO
  $(".msg_wrtn").keydown(
    function(e) {
      if (e.which == 13) {
        sendMessage();
        setTimeout(isWriting, 1000);
        setTimeout(receiveMessage, 2000);
        setTimeout(lastAccess, 2500);
      }
    }
  );

  // RICERCA UTENTI
  $(".input_searching").on("keyup",
    function () {
      var valueSearch = $(this).val().toLowerCase();
      $(".users_list .user_n_im_i").filter(
        function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(valueSearch) > 0  );
        });
    }
  );

  // INFO O CANCELLA MESSAGGIO
  $(".msg_msg").hover(
    function () {
      $(".info_delete_msg").toggle();
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
  var answerUser = "Ok";
  function receiveMessage () {
    var receiveMsg = $(".templates .msg_row").clone();
    receiveMsg.find(".msg_text").text(answerUser);
    receiveMsg.find(".hour_send").text(time());
    receiveMsg.find(".msg_msg").addClass("msg_white");
    $(".chat").append(receiveMsg);
    lastHour();
    miniMsg();
  }

    // function "utente sta scrivendo"
  function isWriting () {
    var writeAMessage = $(".user_is_writing");
    writeAMessage.find(".last_online").text("Sta scrivendo...");
    return writeAMessage;
  }

    // function "ultimo accesso alle"
  function lastAccess () {
    var lastAcss = $(".user_is_writing");
    lastAcss.find(".last_online").text("Ultimo accesso alle " + time());
  }

  function lastHour () {
    var lastHour = $(".hour_msg");
    lastHour.find("small").text(time());
    return lastHour;
  }

  function miniMsg () {
    var miniMsg = $(".name_user_n_lastmsg");
    miniMsg.find("p").text(answerUser);
    return miniMsg;
  }

});

// FUNCTIONS
