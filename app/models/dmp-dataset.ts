import DS from 'ember-data';
import OsfModel from './osf-model';
import DMPModel, {IdentifierModel, MemberModel} from './dmp-status';

const { attr, belongsTo } = DS;

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

export default class DMPDatasetModel extends OsfModel {
    @attr() dataset_id!: IdentifierModel;
    @attr('string') title!: string;
    @attr('string') description?: string;
    @attr('string') type!: string;
    @attr('string') access_policy?: string;
    @attr('string') data_access!: string;
    @attr('date') issued?: Date;
    @attr() creator?: MemberModel;
    @attr() contact?: MemberModel;
    @attr() distribution?: DistributionModel;

    @belongsTo('dmp-status')
    dmp!: DS.PromiseObject<DMPModel> & DMPModel;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'dmp-dataset': DMPDatasetModel;
    } // eslint-disable-line semi
}
