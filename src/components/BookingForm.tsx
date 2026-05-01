'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

const BookingForm = () => {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Your request has been sent successfully!');
        reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">
            {t('contact.fullName')}
          </label>
          <Input 
            {...register('name')}
            placeholder="John Doe" 
            className={`border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 ${errors.name ? 'border-red-500' : ''}`} 
          />
          {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">
            {t('contact.emailAddress')}
          </label>
          <Input 
            {...register('email')}
            type="email" 
            placeholder="john@example.com" 
            className={`border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 ${errors.email ? 'border-red-500' : ''}`} 
          />
          {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">
            {t('consultation.phone')}
          </label>
          <Input 
            {...register('phone')}
            placeholder="+255..." 
            className={`border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 ${errors.phone ? 'border-red-500' : ''}`} 
          />
          {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">
            {t('contact.company')}
          </label>
          <Input 
            {...register('company')}
            placeholder="Your Company Name" 
            className="border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20" 
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-montserrat font-medium text-prime-blue mb-1.5">
          {t('contact.message')}
        </label>
        <Textarea 
          {...register('message')}
          placeholder="Tell us about your needs..." 
          rows={4} 
          className={`border-gray-200 focus:border-prime-gold focus:ring-prime-gold/20 resize-none ${errors.message ? 'border-red-500' : ''}`} 
        />
        {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message.message}</p>}
      </div>
      <Button 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-prime-blue to-prime-blue/90 hover:from-prime-blue/90 hover:to-prime-blue text-white shadow-lg shadow-prime-blue/30 font-montserrat font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('consultation.submitting')}
          </>
        ) : (
          <>
            {t('contact.sendBtn')} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default BookingForm;
