/**
 * Created by João on 30/04/2016.
 */
var models = [];

models['casa'] =
{
    //path : 'obj/casa_da_musica_salas_separadas/casa_da_musica.obj',
    //path: 'obj/experimentar_2/casa_da_musica_experimentar_2.obj',
    path: 'obj/casa_da_musica_salas_separadas/casa_da_musica.obj',
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/casa_da_musica_uvmap.png',
    name : 'casa',
    title : 'Casa',
    animation : null
};

models['sala_suggia'] =
{
    path: 'obj/casa_da_musica_salas_separadas/sala_suggia.obj',
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/sala_suggia_uvmap.png',
    name : 'sala_suggia',
    title : 'Sala Suggia',
    animation : [23, 0, 18],
    panorama_paths : [
      "img/suggia/medres/suggia-0.jpg",
      "img/suggia/medres/suggia-1.jpg",
      "img/suggia/medres/suggia-2.jpg",
      "img/suggia/medres/suggia-3.jpg",
      "img/suggia/medres/suggia-4.jpg",
      "img/suggia/medres/suggia-5.jpg"
    ]
};
models['sala_2'] =
{
    path : 'obj/casa_da_musica_salas_separadas/sala_concertos_2.obj',
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/sala_concertos_2_uvmap.png',
    name : 'sala_2',
    title : 'Sala 2',
    animation : [-23, 0, 18],
    panorama_paths : [
      "img/sala_2/medres/sala2-0.jpg",
      "img/sala_2/medres/sala2-1.jpg",
      "img/sala_2/medres/sala2-2.jpg",
      "img/sala_2/medres/sala2-3.jpg",
      "img/sala_2/medres/sala2-4.jpg",
      "img/sala_2/medres/sala2-5.jpg"
    ]
};
models['bar'] =
{
    path : 'obj/casa_da_musica_salas_separadas/bar.obj',
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/Bar_uvmap.png',
    name : 'bar',
    title : 'Bar',
    animation : [-23, 0, -18]
};


