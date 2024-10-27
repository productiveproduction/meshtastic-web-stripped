import asyncComponentLoader from '@core/utils/loader/index';
import { MessageCircle, Users, Star } from 'lucide-react';

export const tablistRoutes = [
  {
    component: asyncComponentLoader(() => import('@app/pages/chats/Channels')),
    path: '/',
    title: 'channels',
    icon: Users
  },
  {
    component: asyncComponentLoader(() => import('@app/pages/chats/Chats')),
    path: '/chats',
    title: 'chats',
    icon: MessageCircle
  },
];

export const pagesRoutes = [
  {
    component: asyncComponentLoader(() => import('@app/pages/Connect')),
    path: '/connect',
    title: 'connect'
  },
  {
    component: asyncComponentLoader(() => import('@app/pages/Profile')),
    path: '/profile',
    title: 'profile'
  },
  {
    component: asyncComponentLoader(() => import('@app/pages/Memories')),
    path: '/memories',
    title: 'memories'
  },
  // ["NotFound"]: {
  //   component: asyncComponentLoader(() => import('@pagesNEW/NotFound')),
  //   path: '*',
  // },
]