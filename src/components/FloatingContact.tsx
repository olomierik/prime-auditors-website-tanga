import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calendar, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FloatingContactProps {
  onOpenConsultation: () => void;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: Calendar,
      label: t('floating.bookConsultation'),
      onClick: onOpenConsultation,
      color: 'bg-prime-blue hover:bg-prime-blue/90',
    },
    {
      icon: MessageCircle,
      label: t('floating.whatsapp'),
      href: 'https://wa.me/255798509683',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: Phone,
      label: t('floating.callUs'),
      href: 'tel:+255798509683',
      color: 'bg-prime-gold hover:bg-prime-gold/90 text-prime-blue',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {action.href ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-montserrat font-medium shadow-lg
                      hover:scale-105 hover:shadow-xl transition-all
                      ${action.color}
                    `}
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      action.onClick?.();
                      setIsExpanded(false);
                    }}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-montserrat font-medium shadow-lg
                      hover:scale-105 hover:shadow-xl transition-all
                      ${action.color}
                    `}
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all
          ${isExpanded ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-to-br from-prime-blue to-prime-blue/80 hover:scale-110'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? 'Close menu' : 'Open contact options'}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <ChevronUp className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingContact;