import DS from 'ember-data';

import { DMPDatasetModel } from 'ember-osf-web/models/dataset-status';
import OsfModel from './osf-model';

const { attr } = DS;

export interface IdentifierModel {
    identifier: string;
    type: string;
}

export interface MemberModel {
    contactId: IdentifierModel;
    mbox: string;
    name: string;
    role: string;
}

export interface FundingModel{
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

export interface HostModel{
    title: string;
    url: string;
}

export interface LicenseModel{
    name: string;
    licenseRef: string;
    startDate: string;
}

export interface DistributionModel{
    host: HostModel;
    title: string;
    accessUrl: string;
    byteSize: string;
    license: LicenseModel;
}

// export class DMPDatasetModel {
//     @attr() datasetId!: IdentifierModel;
//     @attr('string') title!: string;
//     @attr('string') description!: string;
//     @attr('string') type!: string;
//     @attr('string') accessPolicy!: string;
//     @attr('string') dataAccess!: string;
//     @attr('string') issued!: string;
//     @attr() creator!: MemberModel;
//     @attr() contact!: MemberModel;
//     @attr() distribution!: DistributionModel;
//     @attr('boolean') datasetIsNew!: boolean;
// }

export default class DMPModel extends OsfModel {
    @attr() dmpId!: IdentifierModel;
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
