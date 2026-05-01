import React, { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Loader2, Calendar as CalendarIcon } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company_name: "",
    message: "",
    preferred_date: "",
    preferred_time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      ...formData,
      preferred_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    };

    try {
      const { error: dbError } = await supabase
        .from("consultation_requests")
        .insert([submitData]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-consultation-email",
        {
          body: {
            ...submitData,
            to_email: "info@primeauditors.co.tz",
          },
        }
      );

      if (emailError) {
        console.warn("Email sending failed:", emailError);
      }

      toast({
        title: t('consultation.title'),
        description: "Thank you for your interest! We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone_number: "",
        company_name: "",
        message: "",
        preferred_date: "",
        preferred_time: "",
      });
      setSelectedDate(undefined);
      onClose();
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat font-bold text-prime-blue flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-prime-blue to-prime-gold flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            {t('consultation.title')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.name')} *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20"
              />
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.email')} *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.phone')} *
              </label>
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="+255 798 509 683"
                required
                className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20"
              />
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.companyName')}
              </label>
              <Input
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.preferredDate')}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-200 hover:border-prime-gold focus:border-prime-gold"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-prime-gold" />
                    {selectedDate ? format(selectedDate, "PPP") : <span className="text-gray-400">Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-lg border border-gray-200"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
                {t('consultation.preferredTime')}
              </label>
              <select
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:border-prime-gold focus:ring-prime-gold/20 hover:border-prime-gold transition-colors"
              >
                <option value="">Select time</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-montserrat font-medium text-prime-blue mb-1.5">
              {t('consultation.message')}
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your needs and how we can help..."
              rows={4}
              className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              {t('consultation.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-prime-blue to-prime-blue/90 hover:from-prime-blue/90 hover:to-prime-blue text-white shadow-lg shadow-prime-blue/30 font-montserrat font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('consultation.submitting')}
                </>
              ) : (
                <>
                  {t('consultation.submit')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};