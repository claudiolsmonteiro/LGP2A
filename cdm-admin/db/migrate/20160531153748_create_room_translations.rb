class CreateRoomTranslations < ActiveRecord::Migration
  def change
    create_table :room_translations do |t|

      t.timestamps null: false
    end
  end
end
