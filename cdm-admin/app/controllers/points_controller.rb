class PointsController < ApplicationController

  def index
    @points = Point.all
  end

  def show
    @point = Point.find(params[:id])
  end

  def new
    @point = Point.new
  end

  def create
    @point = Point.new(points_params)
    if @point.save
      redirect_to @point
    else
      render 'f/newpoint'
    end
  end

  def edit
  end

  def update
  end

  def destroy
    Point.find(params[:id]).destroy
    redirect_to points_url
  end

  private

  def points_params
    params.require(:point).permit(:x, :y, :photo_id)
  end
end
