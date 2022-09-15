class PostsController < ApplicationController
  before_action :authorized_user, except: [:index]

  def index
    posts = Post.all
    render json: posts, status: :ok
  end
  
  # def show
  #   post = find_post
  #   render json: post, include: ['user'], status: :ok
  # end

  def create
    post = Post.create!(post_params)
    render json: post, status: :ok
  end

  def update
    post = find_post
    post.update!(post_params)
    render json: post, status: :accepted
  end

  def destroy
    post = find_post
    post.destroy
    head :no_content
  end

  private

  def find_post
    Post.find(params[:id])
  end

  def post_params
    params.permit(:user_id, :group_id, :text)
  end
end
