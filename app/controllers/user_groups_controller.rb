class UserGroupsController < ApplicationController
  def create
    # group = Group.find(params[:id])
    ug = UserGroup.create!(ug_params)
    render json: ug, status: :created
  end

  def destroy
    ug = UserGroup.find_by(user_id: current_user.id, group_id: params[:id])
    ug.destroy
    head :no_content
  end

  private

  def ug_params
    params.permit(:user_id, :group_id)
  end
end
