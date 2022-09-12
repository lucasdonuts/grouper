class Group < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 50 }
end
