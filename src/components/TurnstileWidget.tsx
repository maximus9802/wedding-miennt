'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

export interface TurnstileWidgetRef {
  reset: () => void;
}

interface TurnstileWidgetProps {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onError?: (error?: unknown) => void;
  onExpire?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: unknown) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_ID = 'cf-turnstile-script';

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  ({ siteKey, onSuccess, onError, onExpire, className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch (e) {
            console.warn('[Turnstile] Reset failed:', e);
          }
        }
      },
    }));

    useEffect(() => {
      if (!siteKey) {
        setIsLoading(false);
        return;
      }

      let isMounted = true;
      let checkInterval: ReturnType<typeof setInterval> | null = null;

      const renderTurnstile = () => {
        if (!isMounted || !containerRef.current || !window.turnstile) return;

        // Clean up previous widget instance if any
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // ignore
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              if (isMounted) {
                onSuccess(token);
              }
            },
            'error-callback': (err: unknown) => {
              if (isMounted) {
                onError?.(err);
              }
            },
            'expired-callback': () => {
              if (isMounted) {
                onExpire?.();
              }
            },
            theme: 'light',
          });
          widgetIdRef.current = id;
          setIsLoading(false);
        } catch (err) {
          console.error('[Turnstile] Render error:', err);
          if (isMounted) {
            onError?.(err);
            setIsLoading(false);
          }
        }
      };

      const startLoadingScript = () => {
        if (window.turnstile) {
          renderTurnstile();
          return;
        }

        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.id = SCRIPT_ID;
          script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        let attempts = 0;
        checkInterval = setInterval(() => {
          attempts++;
          if (window.turnstile) {
            if (checkInterval) clearInterval(checkInterval);
            renderTurnstile();
          } else if (attempts > 50) {
            if (checkInterval) clearInterval(checkInterval);
            console.warn('[Turnstile] Script loading timed out.');
            if (isMounted) {
              setIsLoading(false);
              onError?.(new Error('Cloudflare Turnstile load timeout'));
            }
          }
        }, 100);
      };

      startLoadingScript();

      return () => {
        isMounted = false;
        if (checkInterval) clearInterval(checkInterval);
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // ignore
          }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey]);

    if (!siteKey) {
      return (
        <div className="p-3 text-xs rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-center max-w-md mx-auto my-2">
          <p className="font-semibold mb-0.5">Chưa cấu hình Cloudflare Turnstile Site Key</p>
          <p className="text-[11px] text-amber-700">
            Vui lòng thêm biến môi trường <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">TURNSTILE_SITE_KEY</code> trên Vercel hoặc trong file <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/config/wedding.ts</code>.
          </p>
        </div>
      );
    }

    return (
      <div className={`turnstile-wrapper flex flex-col items-center justify-center my-2 ${className}`}>
        {isLoading && (
          <div className="text-[11px] text-[#766E65] py-2 animate-pulse">
            Đang tải mã xác thực bảo mật...
          </div>
        )}
        <div ref={containerRef} className="min-h-[65px] flex items-center justify-center" />
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';

export default TurnstileWidget;
