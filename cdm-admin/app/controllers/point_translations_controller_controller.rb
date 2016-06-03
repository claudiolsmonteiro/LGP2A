class PointTranslationsControllerController < ApplicationController
  attr_accessor :title, :description, :language_id

  def new
  end

  class PointTranslationController < ApplicationController
    def new
      @point_translation = PointTranslation.new
    end

    def create
      @point_translation = PointTranslation.new(point_translation_params)

      #@point_translation.title = params[:point][:point_translations][:title]
      #:description => params[:points][:description],
      #:language_id => params[:points][:language_id])

      if @point_translation.save
        format.html { redirect_to @point, notice: 'Point Translation was successfully created.' }
        format.json { render :show, status: :created, location: @point }
      else
        format.html { render :new }
        format.json { render json: @point.errors, status: :unprocessable_entity }
      end
    end

    def edit
    end

    def update
    end

    def destroy
    end

    end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def show
  end

  def point_translation_params
    #params.fetch(:point, {})
    params.require(:point_translations).permit(:title, :description, :language_id, :point_id)
  end

end
