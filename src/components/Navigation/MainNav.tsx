import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { UserNav } from './UserNav';

export async function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <MobileNav />
          <div className="hidden md:flex">
            <h1 className="font-bold text-xl">AI Calda</h1>
          </div>
        </div>
        <DesktopNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
