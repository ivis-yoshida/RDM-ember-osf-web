import DS from 'ember-data';

import {
    DMPDatasetModel, IdentifierModel, MemberModel, ProjectModel
} from 'ember-osf-web/models/dataset-status';
import OsfModel from './osf-model';

const { attr } = DS;

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
