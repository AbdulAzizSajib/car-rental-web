import { LucideIcon } from 'lucide-react';

interface PagePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PagePlaceholder({
  icon: Icon,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <div className="px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-xl p-10 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon size={22} className="text-gray-700" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
