import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Work, Category } from '@/types/work';

interface WorkFormProps {
  initialData?: Work | null;
  onSubmit: (workData: Omit<Work, 'id'>) => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  category: Category;
  summary: string;
  content: string;
  tags: string;
  isFeatured: boolean;
  createdAt: string;
}

interface FormErrors {
  title?: string;
  summary?: string;
  content?: string;
}

const initialFormData: FormData = {
  title: '',
  category: 'poetry',
  summary: '',
  content: '',
  tags: '',
  isFeatured: false,
  createdAt: new Date().toISOString().split('T')[0],
};

export default function WorkForm({ initialData, onSubmit, onCancel }: WorkFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        summary: initialData.summary,
        content: initialData.content,
        tags: initialData.tags.join(', '),
        isFeatured: initialData.isFeatured,
        createdAt: initialData.createdAt,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '请输入作品标题';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = '请输入作品摘要';
    }

    if (!formData.content.trim()) {
      newErrors.content = '请输入作品正文';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const workData: Omit<Work, 'id'> = {
      title: formData.title.trim(),
      category: formData.category,
      categoryLabel:
        formData.category === 'poetry'
          ? '诗歌'
          : formData.category === 'prose'
            ? '散文'
            : '小说',
      summary: formData.summary.trim(),
      content: formData.content.trim(),
      createdAt: formData.createdAt,
      wordCount: 0,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
      isFeatured: formData.isFeatured,
    };

    onSubmit(workData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const isEditing = !!initialData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white rounded-lg shadow-elegant border-elegant p-6 md:p-8"
    >
      <h2 className="font-display text-2xl font-semibold text-ink-700 mb-6">
        {isEditing ? '编辑作品' : '添加新作品'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-ink-600 mb-2">
            标题 <span className="text-vermilion-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="输入作品标题"
            className={`w-full px-4 py-2.5 border rounded-sm bg-cream-50 text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200 ${
              errors.title ? 'border-vermilion-500' : 'border-cream-300'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-vermilion-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-ink-600 mb-2">
            分类
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-cream-300 rounded-sm bg-cream-50 text-ink-700 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200"
          >
            <option value="poetry">诗歌</option>
            <option value="prose">散文</option>
            <option value="fiction">小说</option>
          </select>
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-ink-600 mb-2">
            摘要 <span className="text-vermilion-500">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
            placeholder="简短描述作品内容（100字以内）"
            className={`w-full px-4 py-2.5 border rounded-sm bg-cream-50 text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200 resize-vertical ${
              errors.summary ? 'border-vermilion-500' : 'border-cream-300'
            }`}
          />
          {errors.summary && (
            <p className="mt-1.5 text-sm text-vermilion-600">{errors.summary}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-ink-600 mb-2">
            正文 <span className="text-vermilion-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            placeholder="输入完整正文内容...&#10;&#10;段落之间用空行分隔"
            className={`w-full px-4 py-2.5 border rounded-sm bg-cream-50 text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200 resize-vertical font-body leading-relaxed ${
              errors.content ? 'border-vermilion-500' : 'border-cream-300'
            }`}
          />
          {errors.content && (
            <p className="mt-1.5 text-sm text-vermilion-600">{errors.content}</p>
          )}
          {formData.content && (
            <p className="mt-1.5 text-xs text-ink-400">
              字数：{formData.content.replace(/\s/g, '').length} 字
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-ink-600 mb-2">
            标签
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="用逗号分隔多个标签"
            className="w-full px-4 py-2.5 border border-cream-300 rounded-sm bg-cream-50 text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={e =>
                  setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cream-300 rounded-full peer-checked:bg-vermilion-500 transition-colors duration-200" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
            </div>
            <span className="text-sm font-medium text-ink-600 group-hover:text-ink-700 transition-colors">
              是否精选
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium text-ink-600 mb-2">
            创作日期
          </label>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-cream-300 rounded-sm bg-cream-50 text-ink-700 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 focus:border-vermilion-500 transition-all duration-200"
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-cream-200">
          <button type="submit" className="btn-primary flex-1 md:flex-none">
            保存作品
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 md:flex-none"
          >
            取消
          </button>
        </div>
      </form>
    </motion.div>
  );
}
