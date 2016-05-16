class AddCodeToRoom < ActiveRecord::Migration
  def change
    add_column :rooms, :code, :string
  end
end
