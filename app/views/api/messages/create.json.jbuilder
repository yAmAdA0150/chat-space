json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name  @message.user.name
jsomn
#idもデータとして渡す
json.id         @message.id