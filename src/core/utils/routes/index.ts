import asyncComponentLoader from '@core/utils/loader/index';
import { MessageCircle, Users, Star } from 'lucide-react';

export const tablistRoutes = [
  {
    component: asyncComponentLoader(() => import('@pagesNEW/chats/Channels')),
    path: '/',
    title: 'channels',
    icon: Users
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/chats/Chats')),
    path: '/chats',
    title: 'chats',
    icon: MessageCircle
  },
];

export const pagesRoutes = [
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Connect')),
    path: '/connect',
    title: 'connect'
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Profile')),
    path: '/profile',
    title: 'profile'
  },
  {
    component: asyncComponentLoader(() => import('@pagesNEW/Memories')),
    path: '/memories',
    title: 'memories'
  },
  // ["NotFound"]: {
  //   component: asyncComponentLoader(() => import('@pagesNEW/NotFound')),
  //   path: '*',
  // },
]