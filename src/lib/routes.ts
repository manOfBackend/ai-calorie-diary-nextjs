import { Home, PieChart, User, Settings } from 'lucide-react';

export const routes = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Your daily overview and summary',
  },
  {
    href: '/diary',
    label: 'Diary',
    icon: PieChart,
    description: 'Track your meals and calories',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
    description: 'Manage your account settings',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'Configure app preferences',
  },
] as const;
