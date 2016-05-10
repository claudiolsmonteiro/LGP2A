class Point < ActiveRecord::Base
  belongs_to :photo
  has_many :point_translations
end
