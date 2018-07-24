import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | paginated-list/all', hooks => {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(hbs`{{paginated-list/all}}`);

        assert.dom(this.element).hasText('');

        // Template block usage:
        await render(hbs`
            {{#paginated-list/all}}
                template block text
            {{/paginated-list/all}}
        `);

        assert.dom(this.element).hasText('template block text');
    });
});
