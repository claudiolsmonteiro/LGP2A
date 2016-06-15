class PointsController < ApplicationController
  before_action :set_point, only: [:show, :edit, :update, :destroy]
  attr_accessor :point_translations

  def index
    @points = Point.all
    @point_ts = PointTranslation.all
    @photos = Photo.all
    @rooms = Room.all
    @rooms_ts = RoomTranslation.all
  end

  def show
    @point = Point.find(params[:id])
    @points_ts = PointTranslation.all
    @languages = Language.all
  end

  def edit
  end

  def new
    @point = Point.new
    @point.point_translations.build
    @rooms = Room.all
    @languages = Language.all
  end

  def create
    @point = Point.new(points_params)

    respond_to do |format|
      if @point.save

        format.html { redirect_to @point, notice: 'Point was successfully created.' }
        #format.json { render :show, status: :created, location: @point }
      else
        format.html { render :new }
        format.json { render json: @point.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @point.update(points_params)
        format.html { redirect_to @point, notice: 'Point was successfully updated.' }
        format.json { render :show, status: :ok, location: @point }
      else
        format.html { render :edit }
        format.json { render json: @point.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @point.destroy
    respond_to do |format|
      format.html { redirect_to points_url, notice: 'Point was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_point
    point = Point.find_by_id params[:id]
    if !point.blank?
      render :json => {:success => "true", :point => point}
    else
      render :json => {:success => "false"}
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_point
    @point = Point.find(params[:id])
  end
  def points_params
    params.require(:point).permit(:x, :y, :photo_id, point_translations_attributes: [:id, :title, :description, :language_id])
  end
end
