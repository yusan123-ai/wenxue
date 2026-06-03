import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  BookOpen,
  FileText,
  ScrollText,
  Feather,
  AlertCircle,
} from 'lucide-react';
import type { Work } from '@/types/work';
import { useWorksManager } from '@/hooks/useWorksManager';
import WorkForm from '@/components/admin/WorkForm';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

type ViewMode = 'list' | 'add' | 'edit';
type FilterCategory = 'all' | 'poetry' | 'prose' | 'fiction';

const categoryConfig = {
  poetry: {
    label: '诗歌',
    icon: Feather,
    color: 'bg-vermilion-100 text-vermilion-700 border-vermilion-200',
    dotColor: 'bg-vermilion-500',
  },
  prose: {
    label: '散文',
    icon: FileText,
    color: 'bg-bronze-100 text-bronze-700 border-bronze-200',
    dotColor: 'bg-bronze-500',
  },
  fiction: {
    label: '小说',
    icon: ScrollText,
    color: 'bg-ink-100 text-ink-700 border-ink-200',
    dotColor: 'bg-ink-500',
  },
};

export default function AdminPage() {
  const { works, addWork, updateWork, deleteWork, exportToJSON, importFromJSON } =
    useWorksManager();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<Work | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredWorks = useMemo(() => {
    let result = works;

    if (filterCategory !== 'all') {
      result = result.filter(work => work.category === filterCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        work =>
          work.title.toLowerCase().includes(query) ||
          work.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [works, filterCategory, searchQuery]);

  const handleAddClick = () => {
    setEditingWork(null);
    setViewMode('add');
  };

  const handleEditClick = (work: Work) => {
    setEditingWork(work);
    setViewMode('edit');
  };

  const handleDeleteClick = (work: Work) => {
    setWorkToDelete(work);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (workToDelete) {
      deleteWork(workToDelete.id);
      setWorkToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSubmit = (workData: Omit<Work, 'id'>) => {
    if (viewMode === 'edit' && editingWork) {
      updateWork(editingWork.id, workData);
    } else {
      addWork(workData);
    }
    setViewMode('list');
    setEditingWork(null);
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingWork(null);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await importFromJSON(file);
    }
    e.target.value = '';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-cream-100 py-8 md:py-12">
      <div className="container-custom">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-display-md font-semibold text-ink-800 mb-2">
                    📚 作品管理中心
                  </h1>
                  <p className="text-sm text-ink-400">管理和维护您的文学作品</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleImportClick}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink-600 border border-cream-300 rounded-sm hover:bg-cream-100 transition-all duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    导入
                  </button>
                  <button
                    onClick={exportToJSON}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink-600 border border-cream-300 rounded-sm hover:bg-cream-100 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    导出
                  </button>
                  <button
                    onClick={handleAddClick}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    添加新作品
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-elegant border-elegant p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="搜索作品标题或标签..."
                      className="w-full pl-10 pr-4 py-2.5 border border-cream-300 rounded-sm bg-cream-50 text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <Filter className="w-4 h-4 text-ink-400 flex-shrink-0" />
                    {(['all', 'poetry', 'prose', 'fiction'] as FilterCategory[]).map(category => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-all duration-200 ${
                          filterCategory === category
                            ? 'bg-vermilion-500 text-white'
                            : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
                        }`}
                      >
                        {category === 'all' ? '全部' : categoryConfig[category as keyof typeof categoryConfig].label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredWorks.length > 0 ? (
                  <>
                    <div className="overflow-x-auto -mx-6">
                      <table className="w-full min-w-[640px]">
                        <thead>
                          <tr className="border-b border-cream-200">
                            <th className="text-left px-6 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">
                              标题
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">
                              分类
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">
                              日期
                            </th>
                            <th className="text-center px-6 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">
                              精选
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-ink-500 uppercase tracking-wider">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-100">
                          {filteredWorks.map((work, index) => {
                            const config = categoryConfig[work.category];
                            const Icon = config.icon;
                            return (
                              <motion.tr
                                key={work.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="group hover:bg-cream-50 transition-colors duration-150"
                              >
                                <td className="px-6 py-4">
                                  <div className="font-medium text-ink-700 group-hover:text-vermilion-600 transition-colors">
                                    {work.title}
                                  </div>
                                  <div className="text-xs text-ink-400 mt-0.5 truncate max-w-[280px]">
                                    {work.summary}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm border ${config.color}`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                                    {config.label}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-ink-500">{formatDate(work.createdAt)}</td>
                                <td className="px-6 py-4 text-center">
                                  {work.isFeatured ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-vermilion-100 text-vermilion-600 text-xs">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="text-ink-300">—</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                      onClick={() => handleEditClick(work)}
                                      className="p-1.5 text-ink-500 hover:text-vermilion-600 hover:bg-vermilion-50 rounded-sm transition-colors"
                                      title="编辑"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClick(work)}
                                      className="p-1.5 text-ink-500 hover:text-vermilion-600 hover:bg-vermilion-50 rounded-sm transition-colors"
                                      title="删除"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-4 border-t border-cream-200 flex items-center justify-between text-sm text-ink-500">
                      <span>共 {filteredWorks.length} 篇作品</span>
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center"
                  >
                    <AlertCircle className="w-12 h-12 text-ink-300 mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold text-ink-600 mb-2">
                      {searchQuery || filterCategory !== 'all'
                        ? '没有找到匹配的作品'
                        : '还没有作品'}
                    </h3>
                    <p className="text-sm text-ink-400 mb-6">
                      {searchQuery || filterCategory !== 'all'
                        ? '尝试调整筛选条件或搜索关键词'
                        : '点击上方按钮添加您的第一篇作品'}
                    </p>
                    {!searchQuery && filterCategory === 'all' && (
                      <button onClick={handleAddClick} className="btn-primary inline-flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        添加第一篇作品
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <WorkForm
                initialData={editingWork}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          title="确认删除"
          message={`确定要删除《${workToDelete?.title}》吗？此操作不可撤销。`}
          confirmText="确认删除"
          cancelText="取消"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setWorkToDelete(null);
          }}
          variant="danger"
        />
      </div>
    </div>
  );
}
