class ShowGroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :users
  has_many :posts
end
