/**
 * Created by João on 15/05/2016.
 */

var texts = {};

texts['tour'] = {
    title: {
        pt : 'A Casa',
        en : 'A Casa'
    },
    room_dropdown: {
        title: {
            pt: 'Sala',
            en: 'Room'
        }
    },
    more_info_modal: {
        title: {
            pt: 'Detalhes',
            en: 'Details'
        }
    },
    more_info: {
        pt: 'Mais informação',
        en: 'More info'
    }
};

texts['beacons'] = {
    alert_text_generator : function(room_name, language){
        switch(language){
            case 'pt':
                return 'Está perto de:\n' +
                    room_name + '\n' +
                    'Deseja navegar para esta sala?';
            case 'en':
                return 'You are near:\n' +
                    room_name + '\n' +
                    'Do you wish to naviagte to this room?'
        }
    }
}

texts['contacts'] = {
    title: {
        pt : 'Contactos',
        en : 'Contacts'
    }
};

texts['localization'] = {
    title: {
        pt : 'Localização',
        en : 'Localization'
    }
};

texts['language'] = {
    title: {
        pt : 'Idioma',
        en : 'Language'
    },
    languages: {
        pt: {
            name: 'Português'
        },
        en: {
            name: 'English'
        }
    }
};

// MISC
texts['misc'] = {
    close: {
      pt: 'Fechar',
      en: 'Close'
    },
    menu: {
        pt: 'Menu',
        en: 'Menu'
    }
};