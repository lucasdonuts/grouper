class User < ApplicationRecord
  has_secure_password
  
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups
  has_many :posts, dependent: :destroy

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true, uniqueness: true

  private
  
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end
