import { Factory } from 'ember-cli-mirage';

import DMPModel from 'ember-osf-web/models/dmp-status';

export default Factory.extend<DMPModel>({
});

declare module 'ember-cli-mirage/types/registries/schema' {
    export default interface MirageSchemaRegistry {
        dmpStatuses: DMPModel;
    } // eslint-disable-line semi
}
