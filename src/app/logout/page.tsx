import { LogOut } from 'lucide-react';
import { PagePlaceholder } from '@/src/components/page-placeholder';

export default function LogoutPage() {
  return (
    <PagePlaceholder
      icon={LogOut}
      title="Sign out"
      description="You're about to leave Auto Ultimate. Confirm sign out from your profile menu."
    />
  );
}
