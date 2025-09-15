import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Image as ImageIcon,
  FileText,
  Globe,
  Calendar,
  User,
  MoreVertical,
  Upload
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'blog' | 'announcement' | 'promotion';
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
  excerpt: string;
  tags: string[];
}

const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Welcome to Chimpanzee Lodge',
      type: 'page',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      views: 1250,
      featured: true,
      excerpt: 'Experience the magic of Nyungwe National Park from the comfort of our eco-friendly resort.',
      tags: ['welcome', 'about', 'homepage']
    },
    {
      id: '2',
      title: 'Chimpanzee Tracking Experience',
      type: 'blog',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-12T14:20:00Z',
      views: 890,
      featured: true,
      excerpt: 'Join us for an unforgettable chimpanzee tracking adventure in the heart of Nyungwe Forest.',
      tags: ['chimpanzee', 'tracking', 'adventure', 'wildlife']
    },
    {
      id: '3',
      title: 'Special Offer: Early Bird Discount',
      type: 'promotion',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-14T00:00:00Z',
      updatedAt: '2024-01-14T09:15:00Z',
      views: 456,
      featured: false,
      excerpt: 'Book your stay 30 days in advance and save 20% on your accommodation.',
      tags: ['offer', 'discount', 'booking', 'promotion']
    },
    {
      id: '4',
      title: 'Restaurant Menu Update',
      type: 'announcement',
      status: 'draft',
      author: 'Admin',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T16:45:00Z',
      views: 0,
      featured: false,
      excerpt: 'We have updated our restaurant menu with new local and international dishes.',
      tags: ['restaurant', 'menu', 'food', 'update']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800';
      case 'blog':
        return 'bg-green-100 text-green-800';
      case 'announcement':
        return 'bg-yellow-100 text-yellow-800';
      case 'promotion':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteContent = (contentId: string) => {
    setContent(content.filter(item => item.id !== contentId));
    setShowDeleteModal(null);
  };

  const handleEditContent = (item: ContentItem) => {
    setSelectedContent(item);
    setShowContentModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 -mt-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage your website content, blog posts, and announcements.</p>
        </div>
        <button
          onClick={() => setShowContentModal(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Content
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-semibold text-gray-900">{content.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-semibold text-gray-900">
                {content.filter(c => c.status === 'published').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Edit className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {content.filter(c => c.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900">
                {content.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Types</option>
              <option value="page">Pages</option>
              <option value="blog">Blog Posts</option>
              <option value="announcement">Announcements</option>
              <option value="promotion">Promotions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <MoreVertical className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {item.type === 'page' ? (
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                        ) : item.type === 'blog' ? (
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                        ) : item.type === 'announcement' ? (
                          <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-yellow-600" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          {item.featured && (
                            <span className="ml-2 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{item.excerpt}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{item.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {item.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(item.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      {item.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditContent(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => setShowContentModal(true)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Content
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Content</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this content? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteContent(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Modal Placeholder */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedContent ? 'Edit Content' : 'Create New Content'}
            </h3>
            <p className="text-gray-600 mb-6">
              Content editor would go here with rich text editing, image upload, SEO fields, etc.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowContentModal(false);
                  setSelectedContent(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowContentModal(false);
                  setSelectedContent(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {selectedContent ? 'Update Content' : 'Create Content'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
