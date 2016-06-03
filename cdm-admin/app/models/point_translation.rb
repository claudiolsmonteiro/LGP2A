class PointTranslation < ActiveRecord::Base
  belongs_to :point , :class_name => 'Point'
  has_one :language
end
