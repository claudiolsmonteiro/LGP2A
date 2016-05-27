# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Language.create!(:code => "pt", :name => "Português")
Language.create!(:code => "en", :name => "English")

Room.create!(
    :code => "sala_suggia",
    :model_path => "obj/casa_da_musica_salas_separadas/sala_suggia.obj",
    :model_detail_path => "obj/casa_da_musica_salas_separadas/sala_suggia.obj",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/sala_suggia_uvmap.png",
    :texture_detail_path => "obj/casa_da_musica_salas_separadas/texturas/sala_suggia_uvmap.png",
    :animation => [150,0,120],
    :beacon_uuid => "e2c56db5-dffb-48d2-b060-d0f5a71096e0",
    :beacon_major => 1,
    :beacon_minor => 0,
    :next_room => "sala_2"
)


Room.create!(
    :code => "sala_2",
    :model_path => "obj/casa_da_musica_salas_separadas/sala_concertos_2.obj",
    :model_detail_path => "obj/casa_da_musica_salas_separadas/sala_concertos_2.obj",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/sala_concertos_2_uvmap.png",
    :texture_detail_path => "obj/casa_da_musica_salas_separadas/texturas/sala_concertos_2_uvmap.png",
    :animation => [-70,0,50],
    :beacon_uuid => "e2c56db5-dffb-48d2-b060-d0f5a71096e0",
    :beacon_major => 2,
    :beacon_minor => 0,
    :next_room => "bar"
)

Room.create!(
    :code => "bar",
    :model_path => "obj/casa_da_musica_salas_separadas/bar.obj",
    :model_detail_path => "obj/casa_da_musica_salas_separadas/bar.obj",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/Bar_uvmap.png",
    :texture_detail_path => "obj/casa_da_musica_salas_separadas/texturas/Bar_uvmap.png",
    :animation => [-23,0,-18]
)

RoomTranslation.create!(
    :name => "Sala Suggia",
    :description => "Grande sala",
    :room_id => 1,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Suggia Room",
    :description => "Big room",
    :room_id => 1,
    :language_id => 2
)

RoomTranslation.create!(
    :name => "Sala 2",
    :description => "Pequena sala",
    :room_id => 2,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Room 2",
    :description => "Small room",
    :room_id => 2,
    :language_id => 2
)

RoomTranslation.create!(
    :name => "Bar",
    :description => "debaixo da sala",
    :room_id => 3,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Bar",
    :description => "Junk space",
    :room_id => 3,
    :language_id => 2
)

Photo.create!(
    :room_id => 1,
    :url_cube_map => [
        'img/suggia/medres/suggia-0.jpg',
        'img/suggia/medres/suggia-1.jpg',
        'img/suggia/medres/suggia-2.jpg',
        'img/suggia/medres/suggia-3.jpg',
        'img/suggia/medres/suggia-4.jpg',
        'img/suggia/medres/suggia-5.jpg'
    ]
)

Photo.create!(
    :room_id => 2,
    :url_cube_map => [
        'img/sala_2/medres/sala2-0.jpg',
        'img/sala_2/medres/sala2-1.jpg',
        'img/sala_2/medres/sala2-2.jpg',
        'img/sala_2/medres/sala2-3.jpg',
        'img/sala_2/medres/sala2-4.jpg',
        'img/sala_2/medres/sala2-5.jpg'
    ]
)

#points sala suggia
Point.create!(:x => 14.1, :y => 1.5, :photo_id => 1)
Point.create!(:x => -9.4, :y => 222.6, :photo_id => 1)
Point.create!(:x => -0.9, :y => 144.4, :photo_id => 1)

#points sala 2
Point.create!(:x => 14.1, :y => 1.5, :photo_id => 2)
Point.create!(:x => -9.4, :y => 222.6, :photo_id => 2)
Point.create!(:x => -0.9, :y => 144.4, :photo_id => 2)


#point translations sala suggia
PointTranslation.create!(
    :title => 'Piano',
    :description => 'Piano deste lado',
    :point_id => 1,
    :language_id => 1
)


PointTranslation.create!(
    :title => 'Piano',
    :description => 'This Piano',
    :point_id => 1,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Cadeiras',
    :description => 'Muitas',
    :point_id => 2,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Chairs',
    :description => 'Lots',
    :point_id => 3,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Janela',
    :description => 'Grande',
    :point_id => 3,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Window',
    :description => 'Big',
    :point_id => 3,
    :language_id => 2
)

#point translations sala 2
PointTranslation.create!(
    :title => 'Piano',
    :description => 'Piano deste lado',
    :point_id => 4,
    :language_id => 1
)


PointTranslation.create!(
    :title => 'Piano',
    :description => 'This Piano',
    :point_id => 4,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Cadeiras',
    :description => 'Muitas',
    :point_id => 5,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Chairs',
    :description => 'Lots',
    :point_id => 5,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Janela',
    :description => 'Grande',
    :point_id => 6,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Window',
    :description => 'Big',
    :point_id => 6,
    :language_id => 2
)


