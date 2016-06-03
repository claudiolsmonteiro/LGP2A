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
    :model_detail_path => "obj/salas_detail/suggia.dae",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/sala_suggia_uvmap.png",
    :animation => [150,0,120],
    :beacon_uuid => "e2c56db5-dffb-48d2-b060-d0f5a71096e0",
    :beacon_major => 1,
    :beacon_minor => 0,
    :next_room => "sala_2"
)


Room.create!(
    :code => "sala_2",
    :model_path => "obj/casa_da_musica_salas_separadas/sala_concertos_2.obj",
    :model_detail_path => "obj/salas_detail/sala_2.dae",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/sala_concertos_2_uvmap.png",
    :animation => [-70,0,50],
    :beacon_uuid => "e2c56db5-dffb-48d2-b060-d0f5a71096e0",
    :beacon_major => 2,
    :beacon_minor => 0,
    :next_room => "bar"
)

Room.create!(
    :code => "bar",
    :model_path => "obj/casa_da_musica_salas_separadas/bar.obj",
    :model_detail_path => "obj/salas_detail/bar.dae",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/Bar_uvmap.png",
    :animation => [-23,0,-18]
)

Room.create!(
    :code => "casa",
    :model_path => "obj/casa_da_musica_salas_separadas/casa_da_musica.obj",
    :texture_path => "obj/casa_da_musica_salas_separadas/texturas/casa_da_musica_uvmap.png"
)

RoomTranslation.create!(
    :name => "Sala Suggia",
    :description => "<p>Coração da Casa da Música. É a única sala de espetáculos do mundo onde se pode tocar música com luz natural.</p>
<p>O nome desta sala foi adotado a partir do nome da violoncelista Guilhermina Suggia, considerada por muitos a melhor das décadas 20 e 30. A acústica do auditório principal é considerada a melhor do mundo, e não é por acaso, já que todos os materiais de revestimento foram cuidadosamente escolhidos.</p> 
<p>A Orquestra residente é a Orquestra Nacional do Porto, com uma formação permanente de 94 músicos. Além desta, mais duas pequenas orquestras: o Remix Ensemble e a Orquestra Barroca da Casa da Música e, mais recentemente, o Coro da Casa da Música completam o leque de ofertas musicais residentes.</p>",
    :room_id => 1,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Suggia Hall",
    :description => "Casa da Música’s Heart. This is the only concert hall of the entire world where music can be played with natural light. 
The name of this concert hall was chosen from the cellist’s name Guilhermina Suggia, declared by many the best cellist of the 20s and 30s.
The acoustics of this room it’s considered the best of the world, and it isn’t by chance, since all coating materials have been carefully chosen. 
The resident orchestra is the National Orchestra of Porto, with a permanent formation of 94 musicians. In addition to this, two more small orchestras: The Remix Ensemble and the Baroque Orchestra of Casa da Música and, more recently, the Choir of Casa da Música complete the range of musical offers residents.",
    :room_id => 1,
    :language_id => 2
)

RoomTranslation.create!(
    :name => "Sala 2",
    :description => "Segunda Sala de Concertos da Casa da Música. A elegância desta sala deve-se à existência de uma enorme janela orientada para Sul. Isto faz com que durante o dia, grande parte da luz natural da Sala Suggia, seja filtrada através desta e adquira uma certa tonalidade avermelhada. 
As cadeiras em tom roxo são uma elegante homenagem ao designer português Daciano da Costa, autor deste modelo nos anos 70.",
    :room_id => 2,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Hall 2",
    :description => "Second Concert Hall of Casa da Música. The elegance of this hall is due to the existence of a huge window oriented to the south. Because of that, during the day, most of the natural light of Suggia room is filtered through this window and the Hall 2 gets some reddish hue.
The chairs in purple tone is an elegant tribute to the Portuguese designer Daciano da Costa, author of this model in the 70s.",
    :room_id => 2,
    :language_id => 2
)

RoomTranslation.create!(
    :name => "Bar",
    :description => "Utilizado na maior parte das sessões que decorrem na Casa da Música, este bar encontra-se situado acima da escadaria principal, sendo um dos junkspace* mais utilizados do edifício. Com a intenção inicial de servir refeições ligeiras, lanches ou simples cafés, tornou-se ao longo do tempo um local que poderia ser utilizado para outros fins tais como bar para festas e outro tipo de ocasiões onde além de cafés e refeições também se servem outro tipo de bebidas.
Constituído por vários bancos e sofás, torna-se um espaço agradável para conviver e para contemplar a arquitetura do edifício assim como uma imagem daquilo que era a Casa da Música durante o processo de construção. 
*local inicialmente sem utilidade, mas reconfigurado para ter uma determinada finalidade.",
    :room_id => 3,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Bar",
    :description => "Used in most of the sessions that take place in Casa da Música, this bar is located above the main staircase, it’s one of the most used junkspace* building. With the initial intention of serving light meals, snacks or simple cafes, it has become over time a location that could be used for other purposes such as a bar for parties and other occasions where, in addition to coffee and meals, also serve other type of drinks.
Consisting of several banks and sofas, it’s a nice area to chill out and to contemplate the architecture of the building as well as an image of what was Casa da Música during the construction process.
*a local initially useless, but reconfigured to have a particular purpose.",
    :room_id => 3,
    :language_id => 2
)

RoomTranslation.create!(
    :name => "Casa",
    :description => "casa",
    :room_id => 4,
    :language_id => 1
)

RoomTranslation.create!(
    :name => "Casa",
    :description => "Casa",
    :room_id => 4,
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
Point.create!(:x => 13.5, :y => 144.4, :photo_id => 1)

#points sala 2
Point.create!(:x => 14.1, :y => 1.5, :photo_id => 2)
Point.create!(:x => -9.4, :y => 222.6, :photo_id => 2)
Point.create!(:x => -0.9, :y => 144.4, :photo_id => 2)


#point translations sala suggia
PointTranslation.create!(
    :title => 'Parede',
    :description => 'Revestidos a contraplacado de pinho nórdico, as paredes e o teto remetem para um período fundamental da história da música ocidental.',
    :point_id => 1,
    :language_id => 1
)


PointTranslation.create!(
    :title => 'Wall',
    :description => 'Coated with nordic pine plywood, the walls and the ceilling send us to an important time in ocidental music history.',
    :point_id => 1,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Órgão Barroco',
    :description => 'Tradicionalmente o órgão barroco fica do lado esquerdo da orquestra. Este é uma cópia de um órgão mexicano.',
    :point_id => 2,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Baroque organ',
    :description => 'Usually the baroque organ stands in the left side of the orchestra. This is a copy of the Mexican organ.',
    :point_id => 3,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Órgão Romântico',
    :description => 'Este órgão, apesar de ter sido ligeiramente redesenhado pelo próprio Koolhas, é uma cópia de um já existente em Bilbao, Espanha.',
    :point_id => 3,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Romantic organ',
    :description => 'This organ, dispite of being lightly modified by Koolhas himself, it is very similiar to the one in Bilbao, Spain.',
    :point_id => 3,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Canópia',
    :description => 'A canópia permite o reflexo do som, dando aos músicos uma boa condição acústica em palco. Esta, apenas é usada em concertos de música clássica ou sinfónica,  sendo por isso ajustável através de um programa informático. ',
    :point_id => 4,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Canopy',
    :description => 'The canopy allows the reflex of sound, giving the musicians a great acoustic condition on stage. This is just used in classic or symphony concerts and because of that this is adaptable by a computer program.',
    :point_id => 4,
    :language_id => 2
)

#point translations sala 2
PointTranslation.create!(
    :title => 'Revestimento',
    :description => 'O revestimento das paredes e teto permite uma acústica fenomenal devido às perfurações no contraplacado.',
    :point_id => 5,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Coating',
    :description => 'The coating on the walls and ceiling allows an amazing acoustics which happens because of the holes in the plywood.',
    :point_id => 5,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Janela',
    :description => 'Esta janela, ao estar orientada a sul, filtra a luz dando uma tonalidade avermelhada à sala Suggia.',
    :point_id => 6,
    :language_id => 1
)

PointTranslation.create!(
    :title => 'Window',
    :description => 'This window is facing south and so filters the light, giving the Suggia hall a red tone.',
    :point_id => 6,
    :language_id => 2
)

PointTranslation.create!(
    :title => 'Cadeiras',
    :description => 'Estas cadeiras são uma homenagem ao designer português Daciano da Costa, autor deste modelo nos anos 70.',
    :point_id => 7,
    :language_id => 1
)


PointTranslation.create!(
    :title => 'Chairs',
    :description => 'This chairs are a homage to the Portuguese designer Daciano da Costa, maker of this model in the 70\'s.',
    :point_id => 7,
    :language_id => 2
)
