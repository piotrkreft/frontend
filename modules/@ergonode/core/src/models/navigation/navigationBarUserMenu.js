/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import PRIVILEGES from '@Core/config/privileges';

export default [
    {
        title: '@Core._.routes.userMenu',
        menu: [
            {
                title: '@Core._.routes.userMenuProfile',
                routing: '/profile/activity-log-grid',
                icon: () => import('@Core/components/Icons/Menu/IconUser'),
            },
            {
                title: '@Core._.routes.title',
                routing: '/settings',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
                privileges: [
                    PRIVILEGES.SETTINGS.read,
                ],
            },
        ],
    },
];
