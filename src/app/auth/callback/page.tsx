"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/pickem/picks';

      if (code) {
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
      }
      router.replace(next);
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Loader2 className="w-8 h-8 text-pickem-gold animate-spin" />
      <p className="font-mono text-sm uppercase tracking-widest text-pickem-muted">
        Validando credenciales en el Buque...
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-pickem-bg flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-8 h-8 text-pickem-gold animate-spin" />
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
