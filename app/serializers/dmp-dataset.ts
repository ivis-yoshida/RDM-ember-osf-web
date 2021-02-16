import OsfSerializer from './osf-serializer';

export default class DMPDatasetSerializer extends OsfSerializer {
}

declare module 'ember-data/types/registries/serializer' {
    export default interface SerializerRegistry {
        'dmp-dataset': DMPDatasetSerializer;
    } // eslint-disable-line semi
}
