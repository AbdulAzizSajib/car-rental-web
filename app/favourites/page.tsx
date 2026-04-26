import { Heart } from 'lucide-react';
import { PagePlaceholder } from '@/components/page-placeholder';

export default function FavouritesPage() {
  return (
    <PagePlaceholder
      icon={Heart}
      title="Favourites"
      description="Vehicles you've hearted will appear here so you can rent them again with a single tap."
    />
  );
}
