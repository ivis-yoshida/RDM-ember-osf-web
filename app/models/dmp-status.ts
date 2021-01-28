import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export interface IdentiferModel {
    identifier: string;
    type: string;
}
export interface MemberModel {
    contact_id: IdentiferModel;
    mbox: string;
    name: string;
    role: string;
}

export interface FundingModel{
    funder_name: string;
    grand_id: IdentiferModel;
}

export interface ProjectModel {
    title: string;
    description: string;
    project_id: string;
    keywords: string;
    website: string;
    start: Date;
    end: Date;
    funding: FundingModel;
    type: string;
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
