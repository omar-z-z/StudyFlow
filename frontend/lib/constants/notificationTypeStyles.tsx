import { CheckCircle2, AlertTriangle, BookOpen, Info, PlusCircle, Trash2, Briefcase, TrendingUp, Coffee } from 'lucide-react';
import { NotificationType } from '@/types/notification';

export const typeStyles: Record<
  NotificationType,
  { icon: React.ReactNode; bg: string; color: string }
> = {
  task_completed: {
    icon:  <CheckCircle2 className="w-4 h-4" />,
    bg:    'bg-green-100 dark:bg-green-900/30',
    color: 'text-green-500',
  },
  task_added: {
    icon:  <PlusCircle className="w-4 h-4" />,
    bg:    'bg-blue-100 dark:bg-blue-900/30',
    color: 'text-blue-500',
  },
  task_deleted: {
    icon:  <Trash2 className="w-4 h-4" />,
    bg:    'bg-red-100 dark:bg-red-900/30',
    color: 'text-red-500',
  },
  deadline: {
    icon:  <AlertTriangle className="w-4 h-4" />,
    bg:    'bg-yellow-100 dark:bg-yellow-900/30',
    color: 'text-yellow-500',
  },
  course: {
    icon:  <BookOpen className="w-4 h-4" />,
    bg:    'bg-purple-100 dark:bg-purple-900/30',
    color: 'text-purple-500',
  },
  system: {
    icon:  <Info className="w-4 h-4" />,
    bg:    'bg-muted',
    color: 'text-muted-foreground',
  },
  work: {
    icon:  <Briefcase className="w-4 h-4" />,
    bg:    'bg-orange-100 dark:bg-orange-900/30',
    color: 'text-orange-500',
  },
  progress: {
    icon:  <TrendingUp className="w-4 h-4" />,
    bg:    'bg-teal-100 dark:bg-teal-900/30',
    color: 'text-teal-500',
  },
  break: {
    icon:  <Coffee className="w-4 h-4" />,
    bg:    'bg-amber-100 dark:bg-amber-900/30',
    color: 'text-amber-500',
  },
};