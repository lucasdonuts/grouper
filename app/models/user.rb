class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
end
