/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '~/model/stringWrapper';
import { insertValueAtIndex } from '~/model/arrayWrapper';

export function insertExtendingColumn(columns) {
    const { length } = columns;
    return insertValueAtIndex(
        columns,
        {
            id: 'extender',
            label: '',
            type: '',
            editable: false,
            width: 'auto',
            minWidth: 'auto',
        }, length - 1,
    );
}

export function getSortedColumnsByIDs(columns, columnsID) {
    return columns.sort((a, b) => columnsID.indexOf(a.id) - columnsID.indexOf(b.id));
}

export function getMappedColumns(columns) {
    const unchangedColumns = columns;
    const { length } = unchangedColumns;
    const defaultColumnWidth = 150;
    const actionColumnWidth = 40;
    let actionColumnIndex = length - 1;

    for (let i = 0; i < length; i += 1) {
        const { width } = unchangedColumns[i];

        unchangedColumns[i].width = width || defaultColumnWidth;
        unchangedColumns[i].minWidth = width || defaultColumnWidth;
        if (unchangedColumns[i].type === 'CHECK') {
            unchangedColumns[i].isLeftPinned = true;
        }

        if (unchangedColumns[i].id === 'sku') {
            unchangedColumns[i].isRightPinned = true;
        }

        if (unchangedColumns[i].type === 'ACTION') {
            unchangedColumns[i].isRightPinned = true;
            unchangedColumns[i].width = actionColumnWidth;
            unchangedColumns[i].minWidth = actionColumnWidth;
            actionColumnIndex = i;
        }
    }
    if (actionColumnIndex !== length - 1) {
        unchangedColumns.push(unchangedColumns.splice(actionColumnIndex, 1)[0]);
    }

    return insertExtendingColumn(unchangedColumns);
}

export function getMappedGridConfiguration(configuration) {
    const mappedConfiguration = {};
    const configurationKeys = Object.keys(configuration);
    const configurationValues = Object.values(configuration);
    const { length } = configurationKeys;


    for (let i = 0; i < length; i += 1) {
        const splittedKeys = configurationKeys[i].split('_');
        const { length: splittedKeysLength } = splittedKeys;
        if (splittedKeysLength > 0) {
            const capitalizedFirstLetterKey = toCapitalize(
                splittedKeys[splittedKeysLength - 1],
            );

            mappedConfiguration[`isColumn${capitalizedFirstLetterKey}able`] = configurationValues[i];
        }
    }

    return mappedConfiguration;
}

export function getMappedFilter(filter) {
    const entries = Object.entries(filter);
    const { length: entriesLength } = entries;

    let mappedFilter = '';

    for (let j = 0; j < entriesLength; j += 1) {
        const [key, value] = entries[j];
        if (value !== null) {
            if (j === 0) {
                mappedFilter += `${key}=`;
            } else {
                mappedFilter += `;${key}=`;
            }

            if (Array.isArray(value)) {
                mappedFilter += value.join(',');
            } else {
                mappedFilter += value;
            }
        }
    }

    return mappedFilter;
}
