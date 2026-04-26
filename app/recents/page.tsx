import { Clock } from 'lucide-react';
import { PagePlaceholder } from '@/components/page-placeholder';

export default function RecentsPage() {
  return (
    <PagePlaceholder
      icon={Clock}
      title="Recents"
      description="Your recent rentals and recently viewed vehicles will be listed here."
    />
  );
}
