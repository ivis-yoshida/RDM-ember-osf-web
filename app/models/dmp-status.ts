import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export interface MemberModel {
    mbox: string;
    name: string;
    role: string;
    orcid: string;
}

export interface ProjectModel {
    title: string;
    description: string;
}

export interface DMPModel {
    project: ProjectModel;
    contact: MemberModel;
    contributors: MemberModel;
}

export default class DMPStatusModel extends OsfModel {
    @attr() dmp!: DMPModel;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-status': DMPStatusModel;
    } // eslint-disable-line semi
}
