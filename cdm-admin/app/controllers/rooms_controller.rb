class RoomsController < ApplicationController
  before_filter :authorize, :except => [:get_everything]
  before_filter :cors_preflight_check, only: [:get_everything]
  after_filter :cors_set_access_control_headers, only: [:get_everything]

  before_action :set_room, only: [:show, :edit, :update, :destroy]
  attr_accessor :room_translations


  def show
    @rooms = Room.all
    @room = Room.find(params[:id])
    @rooms_ts = RoomTranslation.all
  end

  def new
    @room = Room.new
    @room.room_translations.build
  end

  def edit
    @room = Room.find_by_id params[:id]
  end

  def create
    @room = Room.new(room_params)
    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: 'Espaço criado com sucesso.' }
        format.json { render :show, status: :created, location: @room }
      else
        format.html { render :new }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @room = Room.find_by_id params[:id]
    respond_to do |format|
      if @room.update!(room_params)
        @room.room_translations.destroy
        format.html { redirect_to @room, notice: 'Espaço atualizado com sucesso.' }
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
      format.html { redirect_to rooms_url, notice: 'Espaço apagado com sucesso.' }
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
    @rooms_ts = RoomTranslation.all
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

      room_temp[:audios] = {}
      room.audios.each do |audio|
        audio_temp = audio.attributes
        audio_language = Language.find(audio.language_id).code
        room_temp[:audios][audio_language] = audio_temp
      end

      result[room.code] = room_temp
    end

    render :json => result
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_room
    @room = Room.find_by_id params[:id]
    #redirect_to rooms_path, flash: {error: "The post does not exists"} if @room.nil?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def room_params
    #params.fetch(:room, {})
    params.require(:room).permit(:id, :code, :model_path, :model_detail_path, :texture_path, :texture_detail_path, :animation, :beacon_uuid, :beacon_major, :beacon_minor, :next_room, room_translations_attributes: [:id, :name, :description, :language_id])
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
