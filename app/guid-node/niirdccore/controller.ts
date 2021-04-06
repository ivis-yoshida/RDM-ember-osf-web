import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import Intl from 'ember-intl/services/intl';
import Toast from 'ember-toastr/services/toast';

import DMPModel, {
    DMPDatasetModel, DistributionModel, HostModel, LicenseModel, IdentifierModel, MemberModel,
} from 'ember-osf-web/models/dmp-status';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';

export default class GuidNodeNiirdccore extends Controller {
    @service toast!: Toast;
    @service intl!: Intl;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    @reads('model.taskInstance.value')
    node?: Node;

    isPageDirty: boolean = false;
    modalOpen: boolean = false;
    showDatasetConfirmDialog: boolean = false;
    showDatasetEditDialog: boolean = false;

    configCache?: DS.PromiseObject<DMPModel>;
    datasetEditing!: DMPDatasetModel;

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
        }
        return '';
    }
    set datasetDescription(value: string | undefined) {
        if (this.datasetEditing === undefined || value === undefined) {
            return;
        }
        set(this.datasetEditing, 'description', value);
    }

    // 概略データ量
    @computed('datasetEditing.distribution.byteSize')
    get datasetAmount() {
        if (this.datasetEditing === undefined || this.datasetEditing.distribution === undefined) {
            return '';
        }
        return this.datasetEditing.distribution.byteSize;
    }
    @action
    setDatasetAmount(value: string) {
        if (typeof this.datasetEditing.distribution === 'undefined') {
            const tmp = {} as DistributionModel;
            tmp.byteSize = value;
            set(this.datasetEditing, 'distribution', tmp);
        } else {
            set(this.datasetEditing.distribution, 'byteSize', value);
        }
        this.set('isPageDirty', true);
    }

    // データの提供方針
    @computed('datasetEditing.accessPolicy')
    get datasetAccessPolicy() {
        if (typeof this.datasetEditing.accessPolicy === 'string') {
            return this.datasetEditing.accessPolicy;
        }
        return '';
    }
    set datasetAccessPolicy(value: string | undefined) {
        if (this.datasetEditing === undefined || value === undefined) {
            return;
        }
        set(this.datasetEditing, 'accessPolicy', value);
    }

    // データのアクセス権
    @computed('datasetEditing.dataAccess')
    get datasetDataAccess() {
        return this.datasetEditing.dataAccess;
    }
    @action
    setDatasetDataAccess(value: string) {
        set(this.datasetEditing, 'dataAccess', value);
    }

    // データ公開予定日
    @computed('datasetEditing.issued')
    get datasetIssued() {
        return this.datasetEditing.issued;
    }
    set datasetIssued(value: string | undefined) {
        if (this.datasetEditing === undefined || value === undefined) {
            return;
        }
        // Date validation
        const inputDate = Date.parse(value);
        const errorMsg = document.querySelector('#dateErrorMsg') as HTMLElement;
        const comfirmButton = document.querySelector('#editingSubmit') as HTMLButtonElement;
        if (inputDate <= Date.now()) {
            comfirmButton.disabled = true;
            errorMsg.style.opacity = '1';
            errorMsg.style.height = 'auto';
        } else {
            comfirmButton.disabled = false;
            errorMsg.style.opacity = '0';
            errorMsg.style.height = '0';
            set(this.datasetEditing, 'issued', value);
        }
    }

    // Repository name
    @computed('datasetEditing.distribution.title')
    get datasetRepositoryName() {
        if (this.datasetEditing === undefined || this.datasetEditing.distribution === undefined) {
            return '';
        }
        return this.datasetEditing.distribution.title;
    }
    set datasetRepositoryName(value: string) {
        if (typeof this.datasetEditing.distribution === 'undefined') {
            const tmp = {} as DistributionModel;
            tmp.title = value;
            set(this.datasetEditing, 'distribution', tmp);
        } else {
            set(this.datasetEditing.distribution, 'title', value);
        }
        this.set('isPageDirty', true);
    }

    // Repository URL
    @computed('datasetEditing.distribution.accessUrl')
    get datasetRepositoryUrl() {
        if (this.datasetEditing === undefined || this.datasetEditing.distribution === undefined) {
            return '';
        }
        return this.datasetEditing.distribution.accessUrl;
    }
    set datasetRepositoryUrl(value: string) {
        if (typeof this.datasetEditing.distribution === 'undefined') {
            const tmp = {} as DistributionModel;
            tmp.accessUrl = value;
            set(this.datasetEditing, 'distribution', tmp);
        } else {
            set(this.datasetEditing.distribution, 'accessUrl', value);
        }
        this.set('isPageDirty', true);
    }

    // creator's name
    @computed('datasetEditing.creator.name')
    get datasetCreatorName() {
        if (typeof this.datasetEditing.creator === 'undefined') {
            return '';
        }
        return this.datasetEditing.creator.name;
    }
    @action
    setDatasetCreatorName(value: string) {
        if (typeof this.datasetEditing.creator === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.name = value;
            set(this.datasetEditing, 'creator', tmp);
        } else {
            set(this.datasetEditing.creator, 'name', value);
        }
        this.set('isPageDirty', true);
    }
    // for manual setting
    set datasetCreatorName(value: string) {
        if (typeof this.datasetEditing.creator === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.name = value;
            set(this.datasetEditing, 'creator', tmp);
        } else {
            set(this.datasetEditing.creator, 'name', value);
        }
        this.set('isPageDirty', true);
    }

    @computed('datasetEditing.creator.mbox')
    get datasetCreatorMbox() {
        if (typeof this.datasetEditing.creator === 'undefined') {
            return '';
        }
        return this.datasetEditing.creator.mbox;
    }
    @action
    setDatasetCreatorMbox(value: string) {
        if (typeof this.datasetEditing.creator === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.mbox = value;
            set(this.datasetEditing, 'creator', tmp);
        } else {
            set(this.datasetEditing.creator, 'mbox', value);
        }
        this.set('isPageDirty', true);
    }

    // manager's name
    @computed('datasetEditing.contact.name')
    get datasetManagerName() {
        if (typeof this.datasetEditing.contact === 'undefined') {
            return '';
        }
        return this.datasetEditing.contact.name;
    }
    @action
    setDatasetManagerName(value: string) {
        if (typeof this.datasetEditing.contact === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.name = value;
            set(this.datasetEditing, 'contact', tmp);
        } else {
            set(this.datasetEditing.contact, 'name', value);
        }
        this.set('isPageDirty', true);
    }
    // for manual setting
    set datasetManagerName(value: string) {
        if (typeof this.datasetEditing.contact === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.name = value;
            set(this.datasetEditing, 'contact', tmp);
        } else {
            set(this.datasetEditing.contact, 'name', value);
        }
        this.set('isPageDirty', true);
    }

    @computed('datasetEditing.contact.mbox')
    get datasetManagerMbox() {
        if (typeof this.datasetEditing.contact === 'undefined') {
            return '';
        }
        return this.datasetEditing.contact.mbox;
    }
    @action
    setDatasetManagerMbox(value: string) {
        if (typeof this.datasetEditing.contact === 'undefined') {
            const tmp = {} as MemberModel;
            tmp.mbox = value;
            set(this.datasetEditing, 'contact', tmp);
        } else {
            set(this.datasetEditing.contact, 'mbox', value);
        }
        this.set('isPageDirty', true);
    }

    @action
    async save(this: GuidNodeNiirdccore) {
        if (!this.node || !this.config) {
            throw new EmberError('Illegal config');
        }

        const config = this.config.content as DMPModel;
        config.setProperties(
            {
                dataset: [this.datasetEditing]
            },
        );

        await config.save()
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
    openEditDialog(isNew: boolean, targetDataset: DMPDatasetModel) {
        if (!this.node || !this.config) {
            return;
        }

        this.set('showDatasetEditDialog', true);
        this.set('showDatasetConfirmDialog', false);

        if (isNew) {
            // 新規作成ボタン押下時
            this.createNewDataset();
        } else {
            // 編集ボタン押下時・確認画面の戻るボタン押下時
            this.set('datasetEditing', JSON.parse(JSON.stringify(targetDataset)));
            set(this.datasetEditing, 'datasetIsNew', false);
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
        this.set('datasetEditing', {});
    }

    createNewDataset() {
        this.set('datasetEditing', {} as DMPDatasetModel);

        // datasetId
        const datasetId = {} as IdentifierModel;
        datasetId.identifier = '';
        datasetId.type = '';

        // creator
        const creator = {} as MemberModel;
        creator.mbox = '';
        creator.name = '';
        creator.role = '';
        creator.contactId = {} as IdentifierModel;
        creator.contactId.identifier = '';
        creator.contactId.type = '';

        // contact
        const contact = {} as MemberModel;
        contact.mbox = '';
        contact.name = '';
        contact.role = '';
        contact.contactId = {} as IdentifierModel;
        contact.contactId.identifier = '';
        contact.contactId.type = '';

        // distribution
        const distribution = {} as DistributionModel;
        distribution.title = '';
        distribution.accessUrl = '';
        distribution.byteSize = '';
        distribution.host = {} as HostModel;
        distribution.host.title = '';
        distribution.host.url = '';
        distribution.license = {} as LicenseModel;
        distribution.license.name = '';
        distribution.license.licenseRef = '';
        distribution.license.startDate = '';

        set(this.datasetEditing, 'title', '');
        set(this.datasetEditing, 'description', '');
        set(this.datasetEditing, 'type', '');
        set(this.datasetEditing, 'accessPolicy', '');
        set(this.datasetEditing, 'issued', '');
        set(this.datasetEditing, 'datasetId', datasetId);
        set(this.datasetEditing, 'creator', creator);
        set(this.datasetEditing, 'contact', contact);
        set(this.datasetEditing, 'distribution', distribution);
        set(this.datasetEditing, 'datasetIsNew', true);
    }
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/niirdccore': GuidNodeNiirdccore;
    }
}
