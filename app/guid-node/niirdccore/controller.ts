import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import Intl from 'ember-intl/services/intl';
import Toast from 'ember-toastr/services/toast';

import DMPModel, { DMPDatasetModel } from 'ember-osf-web/models/dmp-status';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';

export default class GuidNode_niirdccore extends Controller {
    @service toast!: Toast;
    @service intl!: Intl;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    @reads('model.taskInstance.value')
    node?: Node;

    isPageDirty: boolean  = false;
    modalOpen: boolean = false;
    showDatasetConfirmDialog: boolean = false;
    showDatasetEditDialog: boolean = false;

    configCache?: DS.PromiseObject<DMPModel>;
    datasetEditing!: DMPDatasetModel;
    datasetIsNew: boolean = false;

    @computed('config.isFulfilled')
    get loading(): boolean {
        return !this.config || !this.config.get('isFulfilled');
    }

    @computed('node')
    get config(): DS.PromiseObject<DMPModel> | undefined {
        if (this.configCache) {
            return this.configCache;
        }
        if (!this.node) {
            return undefined;
        }
        this.configCache = this.store.findRecord('dmp-status', this.node.id);
        return this.configCache!;
    }

    @computed('config.project')
    get project() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return undefined;
        }
        const config = this.config.content as DMPModel;
        return config.project;
    }

    @computed('config.contributors')
    get contributors() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return undefined;
        }
        const config = this.config.content as DMPModel;
        return config.contributors;
    }

    @computed('config.contact')
    get contact() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return undefined;
        }
        const config = this.config.content as DMPModel;
        return config.contact;
    }

    @computed('config.dataset.[]')
    get datasets() {
        if (!this.config || !this.config.get('isFulfilled')) {
            return undefined;
        }
        const config = this.config.content as DMPModel;
        return config.dataset;
    }

    // タイトル
    @computed('datasetEditing.title')
    get datasetTitle() {
        return this.datasetEditing.title;
    }
    set datasetTitle(value: string) {
        set(this.datasetEditing, 'title', value);
    }

    // データ種別
    @computed('datasetEditing.type')
    get datasetType() {
        return this.datasetEditing.type;
    }
    @action
    setDatasetType(value: string) {
        set(this.datasetEditing, 'type', value);
    }

    // 説明
    @computed('datasetEditing.description')
    get datasetDescription() {
        if (typeof this.datasetEditing.description === 'string') {
            return this.datasetEditing.description;
        } else {
            return ''
        }
    }
    set datasetDescription(value: string | undefined) {
        if(this.datasetEditing == undefined || value == undefined){
            return;
        }
        set(this.datasetEditing, 'description', value);
    }

    // 概略データ量
    // @computed('datasetEditing.distribution.byte_size')
    // get datasetAmount() {
    //     if (typeof this.datasetEditing.distribution?.byte_size === 'string') {
    //         return this.datasetEditing.distribution?.byte_size;
    //     } else {
    //         return '';
    //     }
    // }
    // setDatasetAmount(value: string) {
    //     if (this.datasetEditing.isDistributionModel(this.datasetEditing.distribution)) {
    //         set(this.datasetEditing.distribution, 'byte_size', value);
    //     } else {
    //         // create DistributionModel instance
    //         const newDistribution: any = {} as DistributionModel;
    //         newDistribution.byte_size = value;

    //         // set new DistributionModel to datasetEditing.distribution
    //         set(this.datasetEditing, 'distribution', newDistribution);
    //         this.set('isPageDirty', true);
    //     }
    // }
    @computed('datasetEditing.distribution.byte_size')
    get datasetAmount() {
        if (this.datasetEditing == undefined) {
            return '';
        }
        return this.datasetEditing.distribution.byte_size;
    }
    @action
    setDatasetAmount(value: string) {
        if (this.datasetEditing == undefined) {
            return;
        }
        set(this.datasetEditing.distribution, 'byte_size', value);
        this.set('isPageDirty', true);
    }

    @computed('datasetEditing.access_policy')
    get datasetAccessPolicy() {
        if (typeof this.datasetEditing.access_policy === 'string') {
            return this.datasetEditing.access_policy;
        } else {
            return '';
        }
    }
    set datasetAccessPolicy(value: string | undefined) {
        if(this.datasetEditing == undefined || value == undefined){
            return;
        }
        set(this.datasetEditing, 'access_policy', value);
    }

    @computed('datasetEditing.data_access')
    get datasetDataAccess() {
        return this.datasetEditing.data_access;
    }
    set datasetDataAccess(value: string) {
        set(this.datasetEditing, 'data_access', value);
    }

    // scheduled release date
    @computed('datasetEditing.issued')
    get datasetIssued() {
        return this.datasetEditing.issued;
    }
    set datasetIssued(value: string | undefined) {
        if(this.datasetEditing == undefined || value == undefined){
            return;
        }
        set(this.datasetEditing, 'issued', value);
    }

    @computed('datasetEditing.creator')
    get datasetCreator() {
        return this.datasetEditing.creator;
    }
    set datasetCreator(value) {
        set(this.datasetEditing, 'creator', value);
    }

    // manager
    // @computed('datasetEditing.contact')
    // get datasetManager() {
    //     return this.datasetEditing.contact;
    // }
    // set datasetManager(value) {

    //     set(this.datasetEditing, 'contact', value);
    // }

    // Repository name
    // @computed('datasetEditing.distribution')
    // get datasetRepository() {
    //     if (typeof this.datasetEditing.distribution != 'undefined') {
    //         return this.datasetEditing.distribution.title;
    //     } else {
    //         return '';
    //     }
    // }
    // set datasetRepository(value) {
    //     if (typeof value != 'undefined') {
    //         set(this.datasetEditing, 'distribution', value);
    //     }
    // }

    @action
    save(this: GuidNode_niirdccore){
        if (!this.node || !this.config) {
            throw new EmberError('Illegal config');
        }

        const config = this.config.content as DMPModel;
        config.setProperties(
                {
                    dataset: this.datasetEditing, 
                    dataset_is_new: this.datasetIsNew,
                }
            );

        config.save()
            .then(() => {
                this.set('isPageDirty', false);
            })
            .catch(() => {
                this.saveError(config);
            });

        this.closeDialogs();
    }

    saveError(config: DMPModel) {
        config.rollbackAttributes();
        const message = 'failed to save';
        this.toast.error(message);
    }

    @action
    openEditDialog(isNew: boolean, target_dataset: DMPDatasetModel) {
        if (!this.node || !this.config) {
            return;
        }

        this.set('showDatasetEditDialog', true);
        this.set('showDatasetConfirmDialog', false);
        this.set('datasetIsNew', isNew);

        if(!target_dataset) {
            // 新規作成ボタン押下時
            this.set('datasetEditing', Object.create(DMPDatasetModel));
        }
        else{
            // 編集ボタン押下時・確認画面の戻るボタン押下時
            this.set('datasetEditing', JSON.parse(JSON.stringify(target_dataset))); 
        }
    }

    @action
    openConfirmDialog() {
        this.set('showDatasetEditDialog', false);
        this.set('showDatasetConfirmDialog', true);
    }

    @action
    closeDialogs() {
        this.set('showDatasetEditDialog', false);
        this.set('showDatasetConfirmDialog', false);
        this.set('datasetEditing', null);
    }
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/niirdccore': GuidNode_niirdccore;
    }
}
