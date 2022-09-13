class UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def show
    user = User.find(params[:id])
    render json: user, serializer: ShowUserSerializer, status: :ok
  end

  def my_groups
    user = User.find_by(id: session[:user_id])
    render json: user.groups, status: :ok
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
