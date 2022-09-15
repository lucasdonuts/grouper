class ShowGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url

  has_many :users
  has_many :posts
end
