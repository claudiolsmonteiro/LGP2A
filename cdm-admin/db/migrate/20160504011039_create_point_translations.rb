class CreatePointTranslations < ActiveRecord::Migration
  def change
    create_table :point_translations do |t|
      t.string :title
      t.string :description
      t.timestamps null: false
    end
    add_reference :point_translations, :point, index: true, foreign_key: true
  end
end
