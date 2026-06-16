import { NextRequest, NextResponse } from 'next/server';
import { ingredientBuilder } from '@/lib/queries';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const ids = req.nextUrl.searchParams.get('ids');
  if (!ids) {
    return NextResponse.json({ selected_ingredients: [], matching_products: [] });
  }

  const ingredientIds = ids.split(',').filter(Boolean).slice(0, 5);
  const result = await ingredientBuilder(ingredientIds);

  return NextResponse.json(result);
}
