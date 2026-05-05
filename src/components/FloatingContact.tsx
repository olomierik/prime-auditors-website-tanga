import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Phone, MessageSquare, ArrowUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

const FloatingContact: React.FC = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWeChatModal, setShowWeChatModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 items-end">
      <TooltipProvider>
        {/* Scroll to Top */}
        {showScrollTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={scrollToTop}
                size="icon"
                className="w-12 h-12 rounded-full bg-white text-prime-blue shadow-2xl border border-gray-100 hover:bg-gray-50 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Back to Top</TooltipContent>
          </Tooltip>
        )}

        {/* Call Us */}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="tel:+255752401012">
              <Button
                size="icon"
                className="w-12 h-12 rounded-full bg-prime-blue text-white shadow-2xl hover:scale-110 transition-transform"
              >
                <Phone className="w-5 h-5" />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">{t('floating.callUs')}</TooltipContent>
        </Tooltip>

        {/* WhatsApp */}
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href="https://wa.me/255752401012" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">{t('floating.whatsapp')}</TooltipContent>
        </Tooltip>

        {/* WeChat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setShowWeChatModal(true)}
              size="icon"
              className="w-12 h-12 rounded-full bg-[#07C160] text-white shadow-2xl hover:scale-110 transition-transform"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{t('floating.wechat')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* WeChat Modal */}
      <Dialog open={showWeChatModal} onOpenChange={setShowWeChatModal}>
        <DialogContent className="sm:max-w-md bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-center font-montserrat text-prime-blue text-xl mb-4">
              Connect on WeChat
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-64 h-64 border-4 border-prime-gold/20 rounded-2xl flex items-center justify-center p-3 bg-white shadow-xl">
              <QRCodeSVG
                value="weixin://contacts/profile/PrimeAuditors"
                size={220}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="text-center">
              <p className="text-gray-600 font-open-sans">Scan the QR code to connect with our consultants</p>
              <p className="text-prime-blue font-bold mt-2">WeChat ID: PrimeAuditors</p>
            </div>
            <Button 
              onClick={() => setShowWeChatModal(false)}
              className="bg-prime-blue text-white w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingContact;
