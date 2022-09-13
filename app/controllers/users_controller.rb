class UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def show
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.permit(
      :username,
      :password,
      :password_confirmation,
      :first_name,
      :last_name,
      :image_url,
      :bio
    )
  end

end
