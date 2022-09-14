class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image_url, :first_name, :last_name

  has_many :groups
end
