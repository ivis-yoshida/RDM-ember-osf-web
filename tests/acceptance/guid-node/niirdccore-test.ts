import { currentRouteName } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { percySnapshot } from 'ember-percy';
import { module, test } from 'qunit';

import { currentURL, setupOSFApplicationTest, visit } from 'ember-osf-web/tests/helpers';

module('Acceptance | guid-node/niirdccore', hooks => {
    setupOSFApplicationTest(hooks);
    setupMirage(hooks);

    test('logged in', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('dmp-status', 'this is dummy dmp');
        const url = `/${node.id}/niirdccore`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.niirdccore', 'We are at guid-node.niirdccore');
        await percySnapshot(assert);
        // assert.dom('[data-test-param1] input').exists()
        // .hasValue('123');
        // assert.dom('[data-test-save-button]').exists();
    });
});
