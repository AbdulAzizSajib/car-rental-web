import { Bell } from 'lucide-react';
import { PagePlaceholder } from '@/components/page-placeholder';

export default function NotificationsPage() {
  return (
    <PagePlaceholder
      icon={Bell}
      title="Notifications"
      description="Booking confirmations, reminders and price alerts will land here."
    />
  );
}
