import { FileKey } from 'lucide-react';
import { PagePlaceholder } from '@/components/page-placeholder';

export default function LicensePage() {
  return (
    <PagePlaceholder
      icon={FileKey}
      title="License"
      description="Upload and manage your driver's license to unlock instant booking."
    />
  );
}
