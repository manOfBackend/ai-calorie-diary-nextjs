import { startOfDay, endOfDay, format } from 'date-fns';

import { auth } from '@/auth';
import type { Diary, DiaryFilters } from '@/types/diary';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDiariesByPeriod(
  startDate: Date,
  endDate: Date
): Promise<Diary[]> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const filters: DiaryFilters = {
    startDate: format(startOfDay(startDate), 'yyyy-MM-dd'),
    endDate: format(endOfDay(endDate), 'yyyy-MM-dd'),
  };

  const response = await fetch(
    `${API_URL}/diary/period?startDate=${filters.startDate}&endDate=${filters.endDate}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: {
        tags: ['diary', filters.startDate, filters.endDate],
        revalidate: 60,
      },
    }
  );
  console.log(response, session);

  if (!response.ok) {
    throw new Error('Failed to fetch diaries');
  }

  return response.json();
}

export async function createDiary(formData: FormData): Promise<Diary> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${API_URL}/api/diary`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create diary');
  }

  return response.json();
}
