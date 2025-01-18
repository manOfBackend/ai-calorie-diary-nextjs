'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
            pathname === route.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
