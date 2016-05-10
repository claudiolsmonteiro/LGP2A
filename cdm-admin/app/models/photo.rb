class Photo < ActiveRecord::Base
  belongs_to :room
  has_many :points
  has_many :videos
end
