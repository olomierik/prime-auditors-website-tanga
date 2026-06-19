import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, Mail, ShieldCheck } from 'lucide-react';

// ────────────────────────────────────────────────────────────────────────────────
// Schemas
// ────────────────────────────────────────────────────────────────────────────────
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'required')
    .regex(/^\+[1-9]\d{6,14}$/, 'phone.invalid'),
});

const emailSchema = z.object({
  email: z.string().min(1, 'required').email('email.invalid'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'otp.length')
    .regex(/^\d{6}$/, 'otp.digits'),
});

type PhoneForm = z.infer<typeof phoneSchema>;
type EmailForm = z.infer<typeof emailSchema>;
type OtpForm = z.infer<typeof otpSchema>;

// ────────────────────────────────────────────────────────────────────────────────
// OTP Step component (shared between phone and email)
// ────────────────────────────────────────────────────────────────────────────────
interface OtpStepProps {
  contact: string;
  contactType: 'phone' | 'email';
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
}

function OtpStep({ contact, contactType, onVerify, onResend, onBack }: OtpStepProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(60);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const handleResend = async () => {
    setResending(true);
    setError(null);
    try {
      await onResend();
      setCountdown(60);
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error.resend'));
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async (data: OtpForm) => {
    setError(null);
    try {
      await onVerify(data.otp);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error.otpInvalid'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <ShieldCheck className="w-10 h-10 mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">
          {contactType === 'phone'
            ? t('auth.otp.sentPhone', { contact })
            : t('auth.otp.sentEmail', { contact })}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.otp.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123456"
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="text-center text-2xl tracking-widest font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {t('auth.otp.verify')}
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-between text-sm">
        <Button variant="ghost" size="sm" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={countdown > 0 || resending}
          onClick={handleResend}
        >
          {resending && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
          {countdown > 0
            ? t('auth.otp.resendIn', { seconds: countdown })
            : t('auth.otp.resend')}
        </Button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Phone tab
// ────────────────────────────────────────────────────────────────────────────────
function PhoneTab() {
  const { t } = useTranslation();
  const { signInWithOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '+255' },
  });

  const onSubmit = async (data: PhoneForm) => {
    setError(null);
    try {
      await signInWithOtp(data.phone, 'phone');
      setPhone(data.phone);
      setStep('otp');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error.send'));
    }
  };

  const handleVerify = async (otp: string) => {
    await verifyOtp(phone, otp, 'phone');
    navigate('/dashboard');
  };

  if (step === 'otp') {
    return (
      <OtpStep
        contact={phone}
        contactType="phone"
        onVerify={handleVerify}
        onResend={() => signInWithOtp(phone, 'phone')}
        onBack={() => setStep('input')}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.phone.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+255712345678"
                    className="pl-9"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">{t('auth.phone.hint')}</p>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {t('auth.sendOtp')}
        </Button>
      </form>
    </Form>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Email tab
// ────────────────────────────────────────────────────────────────────────────────
function EmailTab() {
  const { t } = useTranslation();
  const { signInWithOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: EmailForm) => {
    setError(null);
    try {
      await signInWithOtp(data.email, 'email');
      setEmail(data.email);
      setStep('otp');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error.send'));
    }
  };

  const handleVerify = async (otp: string) => {
    await verifyOtp(email, otp, 'email');
    navigate('/dashboard');
  };

  if (step === 'otp') {
    return (
      <OtpStep
        contact={email}
        contactType="email"
        onVerify={handleVerify}
        onResend={() => signInWithOtp(email, 'email')}
        onBack={() => setStep('input')}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.email.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="mwalimu@shule.ac.tz"
                    className="pl-9"
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {t('auth.sendOtp')}
        </Button>
      </form>
    </Form>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// LoginPage
// ────────────────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto text-primary-foreground font-bold text-2xl">
            S
          </div>
          <h1 className="text-2xl font-bold text-foreground">ShuleConnect</h1>
          <p className="text-sm text-muted-foreground">{t('auth.tagline')}</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('auth.signIn')}</CardTitle>
            <CardDescription>{t('auth.selectMethod')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone">
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="phone" className="gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {t('auth.tab.phone')}
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {t('auth.tab.email')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="phone">
                <PhoneTab />
              </TabsContent>
              <TabsContent value="email">
                <EmailTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          {t('auth.noAccount')}
        </p>
      </div>
    </div>
  );
}
