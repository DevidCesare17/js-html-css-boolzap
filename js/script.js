$(document).ready(function () {

  $(".user_n_im_i").hover(
    function () {
      $(this).addClass("bgcolor_grey");
    }
  );
  $(".user_n_im_i").click(
    function () {
      var userImg = $(".name_user > img").clone();
      userImg.appendTo(".img_user");

      var userName = $(".name_user_n_lastmsg > h4").clone();
      userName.appendTo("p.user_name");

    }
  );

  $(".msg_wrtn").keydown(
    function(e) {
    if (e.which == 13) {
      var msgSend = $(".msg_wrtn").val();
      msgSend.appendTo(".msg_msg");
      $(".msg_msg").removeClass("d_none");
      $(".msg_msg").addClass("msg_green");
    }
    }
  );

});
