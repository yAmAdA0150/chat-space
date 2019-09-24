$(document).on('turbolinks:load', function(){
  function buildHTML(message){

    var image = message.image? `<p><img src="${message.image}"></p>` :``;
  
    var html = ` <div class="message" data-message-id= ${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#message_content').val('')
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $('.form__submit').removeAttr('disabled');
    })
  });

      var reloadMessages = function() {

        if(document.URL.match(/\/groups\/\d+\/messages/)) {
          last_message_id = $('.message').last().data('message-id');

      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
        })
        $('.messages').append(insertHTML);

        if (insertHTML.length != 0){
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      })
    }
  };
  setInterval(reloadMessages, 5000);
});
