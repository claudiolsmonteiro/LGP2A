class RoomsController < ApplicationController
  
  before_filter :cors_preflight_check, only: [:get_everything]
  after_filter :cors_set_access_control_headers, only: [:get_everything]

  def show
  end

  def new
    @room = Room.new
  end

  def edit
  end

  def create
    @room = Room.new(room_params)

    @room.model_detail_path= @room.model_path;
    @room.texture_detail_path= @room.texture_path;
    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: 'Room was successfully created.' }
        format.json { render :show, status: :created, location: @room }
      else
        format.html { render :new }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @room.update(room_params)
        format.html { redirect_to @room, notice: 'Room was successfully updated.' }
        format.json { render :show, status: :ok, location: @room }
      else
        format.html { render :edit }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @room.destroy
    respond_to do |format|
      format.html { redirect_to rooms_url, notice: 'Room was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_room
    room = Room.find_by_id params[:id]
    if !room.blank?
      render :json => {:success => "true", :room => room}
    else
      render :json => {:success => "false"}
    end
  end

  def get_room_photos
    room = Room.find_by_id params[:id]
    if !room.blank?
      render :json => {:success => "true", :room_id => room.id, :photos => room.photos}
    else
      render :json => {:success => "false"}
    end
  end

  def index
    @rooms=Room.all
  end

  def get_everything
    result = {}
    Room.all.each do |room|
      room_temp = room.attributes

      photo = room.photo
      if !photo.nil?
        room_temp[:photo] = {}
        photo_temp = photo.attributes
        photo_temp[:points] = Array.new

        photo.points.each do |point|
          point_temp = point.attributes

          point_temp[:translations] = {}
          point.point_translations.each do |translation|
            translation_temp = translation.attributes
            translation_language = Language.find(translation.language_id).code
            point_temp[:translations][translation_language] = translation_temp
          end

          photo_temp[:points].push(point_temp)
        end

        if !photo.video.nil?
          photo_temp[:video] = photo.video.attributes
        else
          photo_temp[:video] = nil
        end

        room_temp[:photo] = photo_temp
      end

      room_temp[:materials] = []
      room.materials.each do |material|
        material_temp = material.attributes
        room_temp[:materials].push(material_temp)
      end

      room_temp[:translations] = {}
      room.room_translations.each do |translation|
        translation_temp = translation.attributes
        translation_language = Language.find(translation.language_id).code
        room_temp[:translations][translation_language] = translation_temp
      end

      result[room.code] = room_temp
    end

    render :json => result
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_room
    @room = Room.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def room_params
    #params.fetch(:room, {})
    params.require(:rooms).permit(:name, :model_path, :model_detail_path, :texture_path, :texture_detail_path, :animation, :beacon_uuid, :beacon_major, :beacon_minor, :next_room)
  end

  #cors headers
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
      headers['Access-Control-Max-Age'] = '1728000'

      render :text => '', :content_type => 'text/plain'
    end
  end

end
