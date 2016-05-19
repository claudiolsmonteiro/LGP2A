/**
 * Created by João on 30/04/2016.
 */
var models2 = {};
/*
models1['vidro'] =
{
  //path : 'obj/casa_da_musica_salas_separadas/casa_da_musica.obj',
  //path: 'obj/experimentar_2/casa_da_musica_experimentar_2.obj',
  path: 'obj/casa_da_musica_salas_separadas/vidro_ondulado.obj',
  material_path: 'obj/casa_da_musica_salas_separadas/vidro_ondulado.mtl',
  texture_path: 'obj/casa_da_musica_salas_separadas/texturas/casa_da_musica_uvmap.png',
  model_dae_path: 'obj/casa_da_musica_salas_separadas/vidro_ondulado.dae',
  name : 'vidro',
  title : 'Vidro',
  animation : null
};
*/
//models2['casa'] =
var model_casa =
{
    //path : 'obj/casa_da_musica_salas_separadas/casa_da_musica.obj',
    //path: 'obj/experimentar_2/casa_da_musica_experimentar_2.obj',
    path: 'obj/casa_da_musica_salas_separadas/casa_da_musica.obj',
    material_path: null,
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/casa_da_musica_uvmap.png',
    model_dae_path: null,
    name : 'casa',
    title : 'Casa',
    animation : null
};

models2['sala_suggia'] =
{
    path: 'obj/casa_da_musica_salas_separadas/sala_suggia.obj',
    material_path: null,
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/sala_suggia_uvmap.png',
    model_dae_path: null,
    name : 'sala_suggia',
    title : 'Sala Suggia',
    animation : [150, 0, 120],
    panorama_paths : [
      "img/suggia/medres/suggia-0.jpg",
      "img/suggia/medres/suggia-1.jpg",
      "img/suggia/medres/suggia-2.jpg",
      "img/suggia/medres/suggia-3.jpg",
      "img/suggia/medres/suggia-4.jpg",
      "img/suggia/medres/suggia-5.jpg"
    ],
    next_room : 'sala_2',
    beacon_uuid : 'e2c56db5-dffb-48d2-b060-d0f5a71096e0',
    beacon_major: 1,
    beacon_minor: 0
};
models2['sala_2'] =
{
    path : 'obj/casa_da_musica_salas_separadas/sala_concertos_2.obj',
    material_path : null,
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/sala_concertos_2_uvmap.png',
    model_dae_path: null,
    name : 'sala_2',
    title : 'Sala 2',
    animation : [-70, 0, 50],
    panorama_paths : [
      "img/sala_2/medres/sala2-0.jpg",
      "img/sala_2/medres/sala2-1.jpg",
      "img/sala_2/medres/sala2-2.jpg",
      "img/sala_2/medres/sala2-3.jpg",
      "img/sala_2/medres/sala2-4.jpg",
      "img/sala_2/medres/sala2-5.jpg"
    ],
    next_room : 'bar',
    beacon_uuid : 'e2c56db5-dffb-48d2-b060-d0f5a71096e0',
    beacon_major: 2,
    beacon_minor: 0
};
models2['bar'] =
{
    path : 'obj/casa_da_musica_salas_separadas/bar.obj',
    material_path : null,
    texture_path: 'obj/casa_da_musica_salas_separadas/texturas/Bar_uvmap.png',
    model_dae_path: null,
    name : 'bar',
    title : 'Bar',
    animation : [-23, 0, -18],
    next_room : null
};



