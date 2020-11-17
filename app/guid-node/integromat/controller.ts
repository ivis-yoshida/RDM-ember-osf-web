import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import DS from 'ember-data';

import $ from 'jquery';

import IntegromatConfigModel from 'ember-osf-web/models/integromat-config';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';
import Toast from 'ember-toastr/services/toast';

export default class GuidNodeIntegromat extends Controller {
    @service toast!: Toast;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    @reads('model.taskInstance.value')
    node?: Node;

    isPageDirty = false;

    configCache?: DS.PromiseObject<IntegromatConfigModel>;

    showRegisterMeetingDialog = false;

    teams_subject = '';
    teams_attendees = '';
    teams_startDate = '';
    teams_startTime = '';
    teams_endDate = '';
    teams_endTime = '';
    teams_location = '';
    teams_content = '';

    @computed('config.isFulfilled')
    get loading(): boolean {
        return !this.config || !this.config.get('isFulfilled');
    }

    @action
    startRegisterMeetingScenario(this: GuidNodeIntegromat) {
        const guid = this.model.guid;
        const teams_subject = this.teams_subject;
        const teams_attendees = this.teams_attendees;
        const teams_startDate = this.teams_startDate;
        const teams_startTime = this.teams_startTime;
        const teams_start_date_time = teams_startDate + ' ' + teams_startTime
        const teams_endDate = this.teams_endDate;
        const teams_endTime = this.teams_endTime;
        const teams_end_date_time = teams_endDate + ' ' + teams_endTime
        const teams_location = this.teams_location;
        const teams_content = this.teams_content;
        
        const payload = { "guid": guid,
                "Action": 'create',
                "Start Date": teams_start_date_time,
                "End Date": teams_end_date_time,
                "Subject": teams_subject,
                "Attendees": teams_attendees,
                "Location": teams_location,
                "Content": teams_content
                };

        if (!this.config) {
            throw new EmberError('Illegal config');
        }
        const config = this.config.content as IntegromatConfigModel;
        const webhookUrl = config.webhook_url;
        console.log(payload + webhookUrl)
        this.set('showRegisterMeetingDialog', false);

        return $.post(webhookUrl, {
            contentType: 'application/json',
            data: JSON.stringify(payload),
            dataType: 'json',
            method: 'POST',
        })
    }

    @action
    closeDialogs() {
        this.set('showRegisterMeetingDialog', false);
    }

    @computed('node')
    get config(): DS.PromiseObject<IntegromatConfigModel> | undefined {
        if (this.configCache) {
            return this.configCache;
        }
        if (!this.node) {
            return undefined;
        }
        this.configCache = this.store.findRecord('integromat-config', this.node.id);
        return this.configCache!;
    }
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/integromat': GuidNodeIntegromat;
    }
}