class CreateRoomTranslations < ActiveRecord::Migration
  def change
    create_table :room_translations do |t|
      t.string :name
      t.string :description
      t.timestamps null: false
    end
    add_reference :room_translations, :room, index: true, foreign_key: true
  end
end
