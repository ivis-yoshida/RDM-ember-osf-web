import { attr } from '@ember-decorators/data';

import OsfModel from './osf-model';

type SchemaBlockType =
    'page-heading' |
    'section-heading' |
    'subsection-heading' |
    'paragraph' |
    'question-title' |
    'short-text-input' |
    'long-text-input' |
    'file-input' |
    'contributors-input' |
    'multi-select-input' |
    'single-select-input' |
    'select-input-option' |
    'select-other-option';

export interface SchemaBlock {
    blockType?: SchemaBlockType;
    chunkId?: string;
    answerId?: string;
    displayText?: string;
    helpText?: string;
    required?: boolean;
    index?: number;
}

export default class SchemaBlockModel extends OsfModel implements SchemaBlock {
    @attr('string') blockType?: SchemaBlockType;
    @attr('string') chunkId?: string;
    @attr('string') answerId?: string;
    @attr('string') displayText?: string;
    @attr('string') helpText?: string;
    @attr('boolean') required?: boolean;
    @attr('number') index?: number;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'schema-block': SchemaBlockModel;
    } // eslint-disable-line semi
}
