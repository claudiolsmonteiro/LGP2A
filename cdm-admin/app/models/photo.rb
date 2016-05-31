class Photo < ActiveRecord::Base
  belongs_to :room
  has_many :points
  has_one :video
end
