json.content     @message.content
json.user_id     @message.user_id
json.image       @message.image.url
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.name        @message.user.name