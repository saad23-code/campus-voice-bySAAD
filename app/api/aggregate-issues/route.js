import { supabase } from '../../../lib/supabase'
import { NextResponse } from 'next/server';

// Force fresh data every time - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const { data: issues, error } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const aggregated = issues.reduce((acc, current) => {
    const shortDesc = current.description.substring(0, 20).toLowerCase();
    const key = `${current.location}-${current.status}-${shortDesc}`;

    if (!acc[key]) {
      acc[key] = {
        ...current,
        reportCount: 1,
        allReporters: [current.student_name],
        allIds: [current.id] 
      };
    } else {
      acc[key].reportCount += 1;
      acc[key].allReporters.push(current.student_name);
      acc[key].allIds.push(current.id);
    }
    return acc;
  }, {});

  return NextResponse.json(Object.values(aggregated));
}