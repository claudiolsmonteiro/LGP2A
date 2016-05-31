class CreatePointTranslations < ActiveRecord::Migration
  def change
    create_table :point_translations do |t|

      t.timestamps null: false
    end
  end
end
