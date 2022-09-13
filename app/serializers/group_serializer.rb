class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url

  has_many :users
end
