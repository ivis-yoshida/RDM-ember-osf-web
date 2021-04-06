import { HandlerContext, Schema } from 'ember-cli-mirage';

export function dmpStatus(this: HandlerContext, schema: Schema) {
    const model = schema.dmpStatuses.first();
    const json = this.serialize(model);
    return json;
}
