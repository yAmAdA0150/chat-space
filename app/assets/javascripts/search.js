$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");
  
  function appendUser(user) {

    var html1 =  ` <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`;
    
      search_list.append(html1);
   }

   function appendErrMsgToHTML(msg) {
      var html1 = ` <p>
                      <div class='chat-group-user clearfix'>${ msg }</div>
                    </p>`;
      search_list.append(html1);
    }

    $('body').on("click", ".chat-group-user__btn--add", function(e) {
      $(this).parent().remove();
      var target = e.target;
      var username = $(target).attr('data-user-name');
      var userid = $(target).attr('data-user-id');

      var html2 = ` <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${userid}">
                      <input name="group[user_ids][]" type="hidden" value="${userid}">
                      <p class="chat-group-user__name">${username}</p>
                      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                    </div>`;

      $("#chat-group-users").append(html2);

    });
    $('.chat-group-form__field--right').on("click", ".chat-group-user__btn--remove", function() {
      $(this).parent().remove();
    });

    $("#user-search-field").on("keyup", function() {

      var input = $("#user-search-field").val();

      if (input.length == 0) {
        $("#user-search-result").empty();
      }
      else{
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            })
            }
          else {
            appendErrMsgToHTML("一致する名前はありません");
          }
        })
        .fail(function() {
          alert('名前検索に失敗しました');
        })
      }
    });
  });