class AddLanguageReferences < ActiveRecord::Migration
  def change
    add_reference :room_translations, :language, index: true, foreign_key: true
    add_reference :point_translations, :language, index: true, foreign_key: true
  end
end
