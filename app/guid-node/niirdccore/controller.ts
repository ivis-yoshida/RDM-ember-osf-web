import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import DS from 'ember-data';

import Intl from 'ember-intl/services/intl';
import DMPStatusModel from 'ember-osf-web/models/dmp-status';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';
import Toast from 'ember-toastr/services/toast';

export default class GuidNode_niirdccore extends Controller {
    @service toast!: Toast;
    @service intl!: Intl;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    @reads('model.taskInstance.value')
    node?: Node;

    isPageDirty = false;

    configCache?: DS.PromiseObject<DMPStatusModel>;

    @computed('config.isFulfilled')
    get loading(): boolean {
        return !this.config || !this.config.get('isFulfilled');
    }

    @action
    save(this: GuidNode_niirdccore) {
        if (!this.config) {
            throw new EmberError('Illegal config');
        }
        const config = this.config.content as DMPStatusModel;

        config.save()
            .then(() => {
                this.set('isPageDirty', false);
            })
            .catch(() => {
                this.saveError(config);
            });
    }

    saveError(config: DMPStatusModel) {
        config.rollbackAttributes();
        const message = 'failed to save';
        this.toast.error(message);
    }

    @computed('config.project')
    get project() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return '';
        }
        const config = this.config.content as DMPStatusModel;
        return config.dmp.project;
    }

    @computed('config.contributors')
    get contributors(){
        if (!this.config || !this.config.get('isFulfilled')) {
            return undefined;
        }
        const config = this.config.content as DMPStatusModel;
        return config.dmp.contributors;
    }

    @computed('config.contact')
    get contact() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return '';
        }
        const config = this.config.content as DMPStatusModel;
        return config.dmp.contact;
    }

    @computed('node')
    get config(): DS.PromiseObject<DMPStatusModel> | undefined {
        if (this.configCache) {
            return this.configCache;
        }
        if (!this.node) {
            return undefined;
        }
        this.configCache = this.store.findRecord('dmp-status', this.node.id);
        return this.configCache!;
    }
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/niirdccore': GuidNode_niirdccore;
    }
}
