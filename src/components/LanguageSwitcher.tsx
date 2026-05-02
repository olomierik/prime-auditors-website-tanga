import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLocale: 'en' | 'zh') => {
    i18n.changeLanguage(newLocale);
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`);
    navigate(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Switch language"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase font-semibold">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🇬🇧</span>
            <span>English</span>
          </div>
          {locale === 'en' && <Check className="w-4 h-4 text-prime-blue" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('zh')}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🇨🇳</span>
            <span>中文</span>
          </div>
          {locale === 'zh' && <Check className="w-4 h-4 text-prime-blue" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
