class PhotoController < ApplicationController

  def get_photo
    photo = Photo.find_by_id params[:id]
    if !photo.blank?
      render :json => {:success => "true", :photo => photo}
    else
      render :json => {:success => "false"}
    end
  end

  def get_photo_points
    photo = Photo.find_by_id params[:id]
    if !photo.blank?
      render :json => {:success => "true", :photo_id => photo.id, :points => photo.points}
    else
      render :json => {:success => "false"}
    end
  end

  def get_photo_videos
    photo = Photo.find_by_id params[:id]
    if !photo.blank?
      render :json => {:success => "true", :photo_id => photo.id, :videos => photo.videos}
    else
      render :json => {:success => "false"}
    end
  end
end
