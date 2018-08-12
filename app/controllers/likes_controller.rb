class LikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Like.all
  end

  def show
    render json: Like.find(params["id"])
  end

  def create
    render json: Like.create(params["like"])
  end

  def delete
    render json: Like.delete(params["id"])
  end

  def update
    render json: Like.update(params["id"], params["like"])
  end
end
