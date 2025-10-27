import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type StatusDisplayProps = {
  lastRefreshedAt: string | null;
  error: string | null;
};

export function StatusDisplay({
  lastRefreshedAt,
  error,
}: StatusDisplayProps) {
  if (error) {
    return (
      <Alert 
        variant="destructive" 
        className="w-full border-red-500/20 bg-red-950/30 backdrop-blur-sm shadow-lg shadow-red-500/10"
      >
        <AlertCircle className="h-5 w-5 text-red-400" />
        <AlertTitle className="text-red-300 font-semibold text-base">Error Occurred</AlertTitle>
        <AlertDescription className="text-red-200/80 mt-2">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (lastRefreshedAt) {
    const timeAgo = formatDistanceToNow(new Date(lastRefreshedAt), {
      addSuffix: true,
    });
    return (
      <div className="w-full p-4 rounded-xl border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl shadow-lg shadow-green-500/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="text-sm font-medium text-slate-200 flex items-center gap-2 mt-0.5">
              <Clock className="h-3.5 w-3.5 text-green-400" />
              {timeAgo}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}