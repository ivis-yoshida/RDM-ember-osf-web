import { Factory } from 'ember-cli-mirage';

import DMPDatasetModel from 'ember-osf-web/models/dataset-status';

export default Factory.extend<DMPDatasetModel>({
});

declare module 'ember-cli-mirage/types/registries/schema' {
    export default interface MirageSchemaRegistry {
        datasetStatuses: DMPDatasetModel;
    } // eslint-disable-line semi
}
