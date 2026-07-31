
import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 'w-6 h-6' }) {
  return <Loader2 className={`${size} animate-spin text-indigo-400`} />;
}