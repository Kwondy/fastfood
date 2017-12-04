/**
 * Created by cheese on 2017. 1. 6..
 */

$('#frm_login').validate({
  onkeyup: false,
  submitHandler: function () {
    return true;
  },
  rules: {
    email: {
      required: true,
      minlength: 10
    },
    password: {
      required: true,
      minlength: 8,
      remote: {
        url: '/api/u1/login',
        type: 'post',
        data: {
          email: function () {
            return $('#email').val();
          }
        },
        dataFilter: function (data) {
          var data = JSON.parse(data);
          if (data.success) {
            return true
          } else {
            return "\"" + data.msg + "\"";
          }
        }
      }
    }
  }
});
