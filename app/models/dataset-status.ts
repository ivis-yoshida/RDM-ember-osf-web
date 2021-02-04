import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

export interface IdentifierModel {
    identifier: string;
    type: string;
}

export interface CreatorModel {
    creatorId: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface MemberModel {
    contactId: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface FundingModel {
    funderName: string;
    grandId: IdentifierModel;
}

export interface ProjectModel {
    title: string;
    description: string;
    projectId: string;
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
    licenseRef: string;
    startDate: string;
}

export interface DistributionModel {
    host: HostModel;
    title: string;
    accessUrl: string;
    license: LicenseModel;
}

export default class DMPDatasetModel extends OsfModel {
    @attr() datasetId!: IdentifierModel;
    @attr('string') title!: string;
    @attr('string') description!: string;
    @attr('string') type!: string;
    @attr('string') accessPolicy!: string;
    @attr('string') byteSize!: string;
    @attr('string') dataAccess!: string;
    @attr('string') issued!: string;
    @attr() creator!: CreatorModel;
    @attr() contact!: MemberModel;
    @attr() distribution!: DistributionModel[];
    @attr('boolean') datasetIsNew!: boolean;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dataset-status': DMPDatasetModel;
    } // eslint-disable-line semi
}
