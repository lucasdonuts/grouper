class GroupsController < ApplicationController
  before_action :authorized_user, only: [:create, :update]

  def index
    groups = Group.all
    render json: groups, status: :ok
  end

  def show
    group = find_group
    render json: group, serializer: ShowGroupSerializer, status: :ok
  end

  def create
    group = Group.create!(group_params)
    render json: group, status: :created
  end

  def update
    group = find_group
    group.update!(group_params)
    render json: group, status: :accepted
  end

  private

  def find_group
    Group.find(params[:id])
  end

  def group_params
    params.permit(:name, :description, :image_url)
  end

end
