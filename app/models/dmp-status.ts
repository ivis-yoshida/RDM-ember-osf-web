import DS from 'ember-data';
import OsfModel from './osf-model';
import DMPDatasetModel from './dmp-dataset';

const { attr, hasMany } = DS;

export interface IdentifierModel {
    identifier: string;
    type: string;
}
export interface MemberModel {
    contact_id: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface FundingModel{
    funder_name: string;
    grand_id: IdentifierModel;
}

export interface ProjectModel {
    title: string;
    description: string;
    project_id: string;
    keywords: string;
    website: string;
    start: string;
    end: string;
    funding: FundingModel;
    type: string;
}

export interface HostModel{
    title: string;
    url: string;
}

export interface LicenseModel{
    name: string;
    license_ref: string;
    start_date: Date;
}

export interface DistributionModel{
    host: HostModel;
    title: string;
    access_url: string;
    byte_size: string;
    license: LicenseModel;
}

export default class DMPModel extends OsfModel {
    @attr() dmp_id!: IdentifierModel; 
    @attr() project!: ProjectModel;
    @attr() contact!: MemberModel;
    @attr() contributors!: MemberModel;
    @hasMany('dmp-dataset')
    dataset?: DS.PromiseManyArray<DMPDatasetModel>;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-status': DMPModel;
    } // eslint-disable-line semi
}
