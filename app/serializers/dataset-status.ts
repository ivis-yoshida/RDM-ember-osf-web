import OsfSerializer from './osf-serializer';

export default class DatasetStatusSerializer extends OsfSerializer {
}

declare module 'ember-data/types/registries/serializer' {
    export default interface SerializerRegistry {
        'dataset-status': DatasetStatusSerializer;
    } // eslint-disable-line semi
}
