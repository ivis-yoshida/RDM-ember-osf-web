import DS from 'ember-data';
import config from 'ember-get-config';
import OsfAdapter from './osf-adapter';

const {
    OSF: {
        url: host,
        webApiNamespace: namespace,
    },
} = config;

export default class DMPDatasetAdapter extends OsfAdapter {
    host = host.replace(/\/+$/, '');
    namespace = namespace;
    parentRelationship = 'dmp';

    buildURL(
        _: string | undefined,
        id: string | null,
        __: DS.Snapshot | null,
        ___: string,
        ____?: {},
    ): string {
        const nodeUrl = super.buildURL('node', null, null, 'findRecord', {});
        const url = nodeUrl.replace(/\/nodes\/$/, '/project/');
        return `${url}${id}/niirdccore/dmp-dataset`;
    }
}

declare module 'ember-data/types/registries/adapter' {
    export default interface AdapterRegistry {
        'dmp-dataset': DMPDatasetAdapter;
    } // eslint-disable-line semi
}
