import { HandlerContext, Schema } from 'ember-cli-mirage';

export function datasetStatus(this: HandlerContext, schema: Schema) {
    const model = schema.datasetStatuses.first();
    const json = this.serialize(model);
    return json;
}
