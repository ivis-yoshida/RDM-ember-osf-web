import OsfSerializer from './osf-serializer';

export default class DMPStatusSerializer extends OsfSerializer {
}

declare module 'ember-data/types/registries/serializer' {
    export default interface SerializerRegistry {
        'dmp-status': DMPStatusSerializer;
    } // eslint-disable-line semi
}
