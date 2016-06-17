class RoomTranslationsController < ApplicationController
  before_filter :authorize
  attr_accessor :name, :description, :language_id

  def new
  end

  class RoomTranslationController < ApplicationController
    def new
      @room_translation = RoomTranslation.new
    end

    def create
      @room_translation = RoomTranslation.new(room_translation_params)

          #@room_translation.name = params[:room][:room_translations][:name]
          #:description => params[:rooms][:description],
          #:language_id => params[:rooms][:language_id])

        if @room_translation.save
          format.html { redirect_to @room, notice: 'Room Translation was successfully created.' }
          format.json { render :show, status: :created, location: @room }
        else
          format.html { render :new }
          format.json { render json: @room.errors, status: :unprocessable_entity }
        end
    end


    def edit
    end

    def update
    end

    def destroy
    end
  end


  def update
  end

  def destroy
  end

  def room_translation_params
    #params.fetch(:room, {})
    params.require(:room_translations).permit(:name, :description, :language_id, :room_id)
  end
end
