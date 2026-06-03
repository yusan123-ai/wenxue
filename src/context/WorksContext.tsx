import { createContext, useContext } from 'react';
import { useWorksManager } from '@/hooks/useWorksManager';
import type { Work, Category } from '@/types/work';
import initialWorksData from '@/data/works';

interface WorksContextType {
  works: Work[];
  categories: typeof initialWorksData.categories;
  authorInfo: typeof initialWorksData.authorInfo;
  addWork: (workData: Omit<Work, 'id'>) => void;
  updateWork: (id: string, workData: Partial<Work>) => void;
  deleteWork: (id: string) => void;
  getWorkById: (id: string) => Work | undefined;
  getWorksByCategory: (category: string) => Work[];
}

const WorksContext = createContext<WorksContextType | null>(null);

export function WorksProvider({ children }: { children: React.ReactNode }) {
  const manager = useWorksManager();

  const value: WorksContextType = {
    works: manager.works,
    categories: initialWorksData.categories,
    authorInfo: initialWorksData.authorInfo,
    addWork: manager.addWork,
    updateWork: manager.updateWork,
    deleteWork: manager.deleteWork,
    getWorkById: manager.getWorkById,
    getWorksByCategory: manager.getWorksByCategory,
  };

  return (
    <WorksContext.Provider value={value}>
      {children}
    </WorksContext.Provider>
  );
}

export function useWorks(): WorksContextType {
  const context = useContext(WorksContext);
  if (!context) {
    throw new Error('useWorks 必须在 WorksProvider 内部使用');
  }
  return context;
}
