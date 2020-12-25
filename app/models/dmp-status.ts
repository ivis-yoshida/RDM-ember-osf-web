import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export default class DMPStatusModel extends OsfModel {
    @attr('string') dmp_id!: string;
    @attr('string') contact!: string;
    @attr('string') project!: string;
    @attr('string') dataset!: string;
    @attr('string') created!: string;
    @attr('string') modified!: string;
        
//    @attr('string') name!: string;
//    @attr('string') mbox!: string;
//    @attr('string') title!: string;
//    @attr('string') description!: string;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-status': DMPStatusModel;
    } // eslint-disable-line semi
}
