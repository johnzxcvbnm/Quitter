class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token


    # Get index of posts
    def index
      render json: Comment.all
    end

    def create
      render json: Comment.create(params["comment"])
    end


    def delete
      render json: Comment.delete(params["id"])
    end


    def update
      render json: Comment.delete(paramas["id"], params["comment"])
    end
  end
