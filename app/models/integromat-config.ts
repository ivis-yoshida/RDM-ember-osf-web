import { attr } from '@ember-decorators/data';
import OsfModel from './osf-model';

export default class IntegromatConfigModel extends OsfModel {
    @attr('string') webhook_url!: string;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'integromat-config': IntegromatConfigModel;
    } // eslint-disable-line semi
}