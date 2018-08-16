class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Get all the posts
  def index
    render json: Post.all
  end

  # Get one specific post at ID
  def show
    render json: Post.find(params["id"])
  end

  # Create a new post
  def create
    render json: Post.create(params["post"])
  end

  # Delete a post at ID
  def delete
    render json: Post.delete(params["id"])
  end

  # Update an existing post at ID
  def update
    render json: Post.update(params["id"], params["post"])
  end
end
