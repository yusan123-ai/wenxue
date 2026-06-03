import { useState, useEffect, useCallback } from 'react';
import type { Work, Category } from '@/types/work';
import initialWorksData from '@/data/works.json';

const STORAGE_KEY = 'wenxue_works';

const categoryLabels: Record<Category, string> = {
  poetry: '诗歌',
  prose: '散文',
  fiction: '小说',
};

function getWordCount(content: string): number {
  return content.replace(/\s/g, '').length;
}

function generateId(category: Category): string {
  return `${category}-${Date.now()}`;
}

export interface UseWorksManagerReturn {
  works: Work[];
  addWork: (workData: Omit<Work, 'id'>) => void;
  updateWork: (id: string, workData: Partial<Work>) => void;
  deleteWork: (id: string) => void;
  getWorkById: (id: string) => Work | undefined;
  getWorksByCategory: (category: string) => Work[];
  exportToJSON: () => void;
  importFromJSON: (file: File) => Promise<void>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: Work[] | null;
}

export function useWorksManager(): UseWorksManagerReturn {
  const [works, setWorks] = useState<Work[]>([]);

  const loadFromLocalStorage = useCallback((): Work[] | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  }, [works]);

  useEffect(() => {
    const storedWorks = loadFromLocalStorage();
    if (storedWorks && storedWorks.length > 0) {
      setWorks(storedWorks);
    } else {
      setWorks(initialWorksData.works);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialWorksData.works));
    }
  }, [loadFromLocalStorage]);

  useEffect(() => {
    if (works.length > 0) {
      saveToLocalStorage();
    }
  }, [works, saveToLocalStorage]);

  const addWork = useCallback((workData: Omit<Work, 'id'>) => {
    const newWork: Work = {
      ...workData,
      id: generateId(workData.category),
      wordCount: getWordCount(workData.content),
      categoryLabel: categoryLabels[workData.category],
    };
    setWorks(prev => [newWork, ...prev]);
  }, []);

  const updateWork = useCallback((id: string, workData: Partial<Work>) => {
    setWorks(prev =>
      prev.map(work =>
        work.id === id
          ? {
              ...work,
              ...workData,
              ...(workData.content ? { wordCount: getWordCount(workData.content) } : {}),
              ...(workData.category ? { categoryLabel: categoryLabels[workData.category as Category] } : {}),
            }
          : work
      )
    );
  }, []);

  const deleteWork = useCallback((id: string) => {
    setWorks(prev => prev.filter(work => work.id !== id));
  }, []);

  const getWorkById = useCallback(
    (id: string): Work | undefined => {
      return works.find(work => work.id === id);
    },
    [works]
  );

  const getWorksByCategory = useCallback(
    (category: string): Work[] => {
      if (category === 'all') return works;
      return works.filter(work => work.category === category);
    },
    [works]
  );

  const exportToJSON = useCallback(() => {
    const dataStr = JSON.stringify({ works }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wenxue_works_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [works]);

  const importFromJSON = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.works && Array.isArray(data.works)) {
        setWorks(data.works);
      } else {
        throw new Error('无效的文件格式');
      }
    } catch (error) {
      alert('导入失败：文件格式不正确');
      console.error('导入失败:', error);
    }
  }, []);

  return {
    works,
    addWork,
    updateWork,
    deleteWork,
    getWorkById,
    getWorksByCategory,
    exportToJSON,
    importFromJSON,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
