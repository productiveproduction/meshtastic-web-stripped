import asyncComponentLoader from '@core/utils/loader/index';
import { MessageCircle, Users, Star } from 'lucide-react';

export const tablistRoutes = [
  {
    component: asyncComponentLoader(() => import('@pagesNEW/tabs/Channels')),
    path: '/',
    title: 'Channels',
    icon: Users
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/tabs/Chats')),
    path: '/chats',
    title: 'Chats',
    icon: MessageCircle
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/tabs/Rewards')),
    path: '/rewards',
    title: 'Rewards',
    icon: Star
  }
];

export const pagesRoutes = [
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Connect')),
    path: '/connect',
    title: 'Connect'
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Profile')),
    path: '/profile',
    title: 'Profile'
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Invite')),
    path: '/invite',
    title: 'Connect'
  },
  // ["NotFound"]: {
  //   component: asyncComponentLoader(() => import('@pagesNEW/NotFound')),
  //   path: '*',
  // },
]