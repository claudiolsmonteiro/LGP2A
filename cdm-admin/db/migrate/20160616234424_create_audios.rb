class CreateAudios < ActiveRecord::Migration

def change
  create_table :audios do |t|
    t.string :path
  end
  add_reference :audios, :language, index: true, foreign_key: true
  add_reference :audios, :room, index: true, foreign_key: true
end
end