class GroupsController < ApplicationController

  def index
    groups = Group.all
    render json: groups, status: :ok
  end

  def show
    group = find_group
    render json: group, status: :ok
  end

  private

  def find_group
    Group.find(params[:id])
  end

end
