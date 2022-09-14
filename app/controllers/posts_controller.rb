class PostsController < ApplicationController

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

  private

  # def find_post
  #   Post.find(param)
  # end

  def post_params
    params.permit(:user_id, :group_id, :text)
  end
end
