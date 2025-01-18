'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { routes } from '@/lib/routes';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-accent ${
                pathname === route.href ? 'bg-accent' : ''
              }`}
            >
              <route.icon className="h-5 w-5" />
              <div className="flex flex-col">
                <span>{route.label}</span>
                <span className="text-xs text-muted-foreground">
                  {route.description}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
