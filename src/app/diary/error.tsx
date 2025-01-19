'use client';

import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function DiaryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Diary error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        문제가 발생했습니다
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="space-x-4">
        <Button onClick={reset} variant="default">
          다시 시도
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          페이지 새로고침
        </Button>
      </div>
    </div>
  );
}
