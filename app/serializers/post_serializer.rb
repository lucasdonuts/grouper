class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at, :group_id

  belongs_to :user
  # belongs_to :group

  def created_at
    object.created_at.strftime('%B %e, %Y %l:%M %p')
  end
end
