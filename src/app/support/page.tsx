import { LifeBuoy } from 'lucide-react';
import { PagePlaceholder } from '@/src/components/page-placeholder';

export default function SupportPage() {
  return (
    <PagePlaceholder
      icon={LifeBuoy}
      title="Support"
      description="Reach out to our 24/7 support team for any questions about your rental."
    />
  );
}
