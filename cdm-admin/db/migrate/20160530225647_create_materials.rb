class CreateMaterials < ActiveRecord::Migration
  def change
    create_table :materials do |t|
      t.string :path
    end
    add_reference :materials, :room, index: true, foreign_key: true
  end
end
