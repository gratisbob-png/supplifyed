import type { Metadata } from 'next';
import { getAllIngredients } from '@/lib/queries';
import IngredientBuilder from '@/components/IngredientBuilder';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ingredient Builder',
  description:
    'Select up to 5 compounds. Find products containing all of them simultaneously.',
};

export default async function BuilderPage() {
  const ingredients = await getAllIngredients();

  return (
    <div className="max-w-4xl mx-auto">
      <IngredientBuilder allIngredients={ingredients} />
    </div>
  );
}
