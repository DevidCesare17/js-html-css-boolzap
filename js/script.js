$(document).ready(function () {

  // EFFETTO CLICK LISTA UTENTI E SOSTITUZIONE SULLA CHAT
  $(".user_n_im_i").click(
    function () {
      $(".user_n_im_i").removeClass("bgcolor_grey");
      $(this).addClass("bgcolor_grey");
      

      var element = $(this).attr("data-contact");
      $("[data-conversation].active").removeClass("active");
      $("[data-conversation=" + element + "]").addClass("active");

      $("conversation_user").removeClass("d_none");
      $("conversation_user").addClass("active");

      var imgUser = $(".bgcolor_grey img").attr("src");
      $(".access_user > img").attr("src", imgUser);

      var userName = $(".bgcolor_grey h4").text();
      $(".user_name").text(userName);
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
          $(this).toggle($(this).text().toLowerCase().indexOf(valueSearch) > -1);
        });
    }
  );

  // INFO O CANCELLA MESSAGGIO
  $(document).on("click", ".info_delete_msg",
    function () {
      $(this).parent(".msg_msg").find(".msg_info_list").toggleClass("d_none");
    }
  );

  $(document).on("click", ".delete_msg_inst",
    function () {
      $(this).parents(".msg_msg").remove();
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
      $(".chat .active").append(templateMessage);
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
    $(".chat .active").append(receiveMsg);
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
    var lastHour = $(".bgcolor_grey .hour_msg");
    lastHour.find("small").text(time());
    return lastHour;
  }

  function miniMsg () {
    var miniMsg = $(".bgcolor_grey .name_user_n_lastmsg");
    miniMsg.find("p").text(answerUser);
    return miniMsg;
  }

});

// FUNCTIONS
