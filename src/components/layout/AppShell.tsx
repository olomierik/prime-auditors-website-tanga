import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Megaphone,
  ClipboardList,
  UserCheck,
  MessageSquare,
  CalendarDays,
  Users,
  BookOpen,
  ShieldCheck,
  LogOut,
  Globe,
  Menu,
  X,
  WifiOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: string[];
  mobileTab?: boolean;
}

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('');
}

export default function AppShell({ children, title }: AppShellProps) {
  const { t, i18n } = useTranslation();
  const { profile, school, signOut, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems: NavItem[] = [
    {
      label: t('nav.dashboard'),
      path: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      mobileTab: true,
    },
    {
      label: t('nav.announcements'),
      path: '/announcements',
      icon: <Megaphone className="w-5 h-5" />,
    },
    {
      label: t('nav.assignments'),
      path: '/assignments',
      icon: <ClipboardList className="w-5 h-5" />,
      mobileTab: true,
    },
    {
      label: t('nav.attendance'),
      path: '/attendance',
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      label: t('nav.messages'),
      path: '/messages',
      icon: <MessageSquare className="w-5 h-5" />,
      mobileTab: true,
    },
    {
      label: t('nav.calendar'),
      path: '/calendar',
      icon: <CalendarDays className="w-5 h-5" />,
      mobileTab: true,
    },
    {
      label: t('nav.students'),
      path: '/students',
      icon: <Users className="w-5 h-5" />,
      roles: ['school_admin', 'teacher'],
    },
    {
      label: t('nav.classes'),
      path: '/classes',
      icon: <BookOpen className="w-5 h-5" />,
      roles: ['school_admin', 'teacher'],
    },
    {
      label: t('nav.auditLog'),
      path: '/audit-log',
      icon: <ShieldCheck className="w-5 h-5" />,
      roles: ['school_admin'],
    },
  ];

  const visibleNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.some(role =>
      hasRole(role as Parameters<typeof hasRole>[0])
    );
  });

  const mobileTabItems = navItems.filter(item => item.mobileTab);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'sw' : 'en';
    i18n.changeLanguage(next);
  };

  const SidebarContent = () => (
    <nav className="flex flex-col h-full py-4">
      {/* Logo / school name */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            S
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate text-foreground">
              ShuleConnect
            </p>
            {school && (
              <p className="text-xs text-muted-foreground truncate">{school.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 space-y-1 px-2 overflow-y-auto">
        {visibleNavItems.map(item => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + '/');
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 md:w-56 border-r border-border bg-card">
        <div className="w-full overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 w-64 bg-card shadow-xl h-full">
            <button
              className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
              aria-label={t('common.close')}
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 h-14 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setSidebarOpen(true)}
              aria-label={t('common.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-semibold text-foreground truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            {!isOnline && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <WifiOff className="w-3 h-3" />
                {t('common.offline')}
              </Badge>
            )}

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(profile?.full_name ?? 'U')
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{profile?.full_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{profile?.role?.replace('_', ' ')}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleLanguage} className="gap-2 cursor-pointer">
                  <Globe className="w-4 h-4" />
                  {i18n.language === 'en' ? 'Kiswahili (SW)' : 'English (EN)'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>

        {/* Mobile bottom tab bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-30">
          {mobileTabItems.map(item => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 py-2 text-xs gap-0.5 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.icon}
                <span className="leading-none">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
