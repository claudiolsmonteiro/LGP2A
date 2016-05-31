class CreateMaterials < ActiveRecord::Migration
  def change
    create_table :materials do |t|
      t.string :belongs_to
      t.string :room

      t.timestamps null: false
    end
  end
end
