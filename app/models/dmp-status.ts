import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export default class DMPStatusModel extends OsfModel {
        
    @attr('string') name!: string;
    @attr('string') mbox!: string;
    @attr('string') title!: string;
    @attr('string') description!: string;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-status': DMPStatusModel;
    } // eslint-disable-line semi
}
