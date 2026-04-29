import { MessageCircle } from 'lucide-react';
import { PagePlaceholder } from '@/src/components/page-placeholder';

export default function ChatPage() {
  return (
    <PagePlaceholder
      icon={MessageCircle}
      title="Chat"
      description="Message hosts, support and your travel companions in one place."
    />
  );
}
