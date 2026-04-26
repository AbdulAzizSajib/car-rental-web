import { FileText } from 'lucide-react';
import { PagePlaceholder } from '@/components/page-placeholder';

export default function NotesPage() {
  return (
    <PagePlaceholder
      icon={FileText}
      title="Notes"
      description="Save private notes about vehicles, drop-off instructions or trip details. Coming soon."
    />
  );
}
