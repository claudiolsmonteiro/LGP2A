class Point < ActiveRecord::Base
  belongs_to :photo
  has_many :point_translations, :class_name => 'PointTranslation', :dependent => :destroy
  accepts_nested_attributes_for :point_translations, :allow_destroy => true
end
