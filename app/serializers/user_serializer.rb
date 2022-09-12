class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :bio, :image_url, :first_name, :last_name
end
