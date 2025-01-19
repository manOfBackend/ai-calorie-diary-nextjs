import { format, parseISO } from 'date-fns';

import { getDiariesByPeriod } from '@/lib/diary';

import DiaryView from './components/DiaryView';

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function DiaryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const targetDate = params?.date || currentDate;
  const parsedDate = parseISO(targetDate);

  const diaries = await getDiariesByPeriod(parsedDate, parsedDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <DiaryView diaries={diaries} currentDate={targetDate} />
    </div>
  );
}
