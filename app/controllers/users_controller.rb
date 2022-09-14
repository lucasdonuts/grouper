class UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, serializer: ShowUserSerializer, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
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
