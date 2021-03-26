import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export interface IdentifierModel {
    identifier: string;
    type: string;
}

export interface CreatorModel {
    creator_id: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface MemberModel {
    contact_id: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface FundingModel {
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

export interface HostModel {
    title: string;
    url: string;
}

export interface LicenseModel {
    name: string;
    license_ref: string;
    start_date: string;
}

export interface DistributionModel {
    host: HostModel;
    title: string;
    access_url: string;
    license: LicenseModel;
}

export class DMPDatasetModel {
    @attr() dataset_id!: IdentifierModel;
    @attr('string') title!: string;
    @attr('string') description!: string;
    @attr('string') type!: string;
    @attr('string') access_policy!: string;
    @attr('string') byte_size!: string;
    @attr('string') data_access!: string;
    @attr('string') issued!: string;
    @attr() creator!: CreatorModel;
    @attr() contact!: MemberModel;
    @attr() distribution!: Array<DistributionModel>;
    @attr('boolean') dataset_is_new!: boolean;
}

export default class DMPModel extends OsfModel {
    @attr() dmp_id!: IdentifierModel;
    @attr() project!: ProjectModel;
    @attr() contact!: MemberModel;
    @attr() contributors!: MemberModel[];
    @attr() dataset!: DMPDatasetModel[];
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-status': DMPModel;
    } // eslint-disable-line semi
}
