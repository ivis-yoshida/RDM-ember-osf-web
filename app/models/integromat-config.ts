import { attr } from '@ember-decorators/data';
import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export default class IntegromatConfigModel extends OsfModel {
    @attr('string') webhook_url!: string;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'integromat-config': IntegromatConfigModel;
    } // eslint-disable-line semi
}