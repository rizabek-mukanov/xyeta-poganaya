import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MongoDb',
    icon: 'shopping-cart-outline',
    link: '/mongo/main',
    home: true,
  },
  {
    title: 'Tables',
    group: true,
  },
  {
    title: 'Civil Departments',
    icon: 'layout-outline',
    link: '/mongo/main/civil',
  },
  {
    title: 'Countries',
    icon: 'map-outline',
    link: '/mongo/main/country',
  },
  {
    title: 'Min Truda',
    icon: 'text-outline',
    link: '/mongo/main/truda',
  },
  {
    title: 'Saldo Other',
    icon: 'grid-outline',
    link: '/mongo/main/saldo-other',
  },
  {
    title: 'Saldo SNG',
    icon: 'shuffle-2-outline',
    link: '/mongo/main/saldo-sng',
  },
];
