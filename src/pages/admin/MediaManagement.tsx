import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Image as ImageIcon,
  Video,
  File,
  Folder,
  MoreVertical,
  Grid,
  List,
  Star,
  Tag
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  alt?: string;
  description?: string;
  featured: boolean;
  usedIn: string[];
}

const MediaManagement: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      type: 'image',
      size: 2048000,
      url: '/images/hero/1707c1d8-30a0-450a-8a7d-463dffb6a852.jpg',
      thumbnail: '/images/hero/1707c1d8-30a0-450a-8a7d-463dffb6a852-300x200.jpg',
      uploadedAt: '2024-01-15T10:30:00Z',
      uploadedBy: 'Admin',
      tags: ['hero', 'forest', 'landscape'],
      alt: 'Chimpanzee Lodge forest view',
      description: 'Beautiful forest view from the lodge',
      featured: true,
      usedIn: ['Homepage', 'About Page']
    },
    {
      id: '2',
      name: 'room-double-bed.jpg',
      type: 'image',
      size: 1536000,
      url: '/images/rooms/double-bed.jpg',
      thumbnail: '/images/rooms/double-bed-300x200.jpg',
      uploadedAt: '2024-01-14T14:20:00Z',
      uploadedBy: 'Admin',
      tags: ['room', 'double', 'bedroom'],
      alt: 'Double bed room interior',
      description: 'Spacious double room with forest view',
      featured: false,
      usedIn: ['Rooms Page', 'Room Detail']
    },
    {
      id: '3',
      name: 'restaurant-interior.mp4',
      type: 'video',
      size: 15728640,
      url: '/videos/restaurant-interior.mp4',
      thumbnail: '/images/restaurant/restaurant-thumb.jpg',
      uploadedAt: '2024-01-13T09:15:00Z',
      uploadedBy: 'Admin',
      tags: ['restaurant', 'video', 'interior'],
      alt: 'Restaurant interior video',
      description: 'Virtual tour of our restaurant',
      featured: true,
      usedIn: ['Restaurant Page']
    },
    {
      id: '4',
      name: 'menu-pdf.pdf',
      type: 'document',
      size: 512000,
      url: '/documents/menu.pdf',
      uploadedAt: '2024-01-12T16:45:00Z',
      uploadedBy: 'Admin',
      tags: ['menu', 'pdf', 'restaurant'],
      alt: 'Restaurant menu PDF',
      description: 'Complete restaurant menu with prices',
      featured: false,
      usedIn: ['Restaurant Page']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesTag = filterTag === 'all' || item.tags.includes(filterTag);
    
    return matchesSearch && matchesType && matchesTag;
  });

  const allTags = Array.from(new Set(media.flatMap(item => item.tags)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'document':
        return <File className="h-5 w-5 text-green-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'document':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteMedia = (mediaId: string) => {
    setMedia(media.filter(item => item.id !== mediaId));
    setShowDeleteModal(null);
  };

  const handleEditMedia = (item: MediaItem) => {
    setSelectedMedia(item);
    setShowMediaModal(true);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log('Uploading files:', files);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-1">Manage your images, videos, and documents.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <Upload className="h-5 w-5 mr-2" />
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ImageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-semibold text-gray-900">
                {media.filter(m => m.type === 'image').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {media.filter(m => m.type === 'video').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <File className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-semibold text-gray-900">
                {media.filter(m => m.type === 'document').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-semibold text-gray-900">
                {media.filter(m => m.featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              {/* Media Preview */}
              <div className="relative aspect-square bg-gray-100">
                {item.type === 'image' ? (
                  <img
                    src={item.thumbnail || item.url}
                    alt={item.alt || item.name}
                    className="w-full h-full object-cover"
                  />
                ) : item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <File className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <button
                      onClick={() => handleEditMedia(item)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(item.id)}
                      className="p-2 bg-white rounded-full text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-2 right-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(item.size)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(item.uploadedAt)}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Media
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Used In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {item.type === 'image' ? (
                            <img
                              src={item.thumbnail || item.url}
                              alt={item.alt || item.name}
                              className="h-10 w-10 rounded object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                              {getTypeIcon(item.type)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatFileSize(item.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.uploadedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.usedIn.length > 0 ? item.usedIn.join(', ') : 'Not used'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditMedia(item)}
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
      )}

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <Upload className="h-5 w-5 mr-2" />
              Upload Your First Files
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Media</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this media file? This action cannot be undone and may affect pages using this media.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMedia(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Modal Placeholder */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedMedia ? 'Edit Media' : 'Upload Media'}
            </h3>
            <p className="text-gray-600 mb-6">
              Media editor would go here with image editing, metadata management, alt text, etc.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowMediaModal(false);
                  setSelectedMedia(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowMediaModal(false);
                  setSelectedMedia(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {selectedMedia ? 'Update Media' : 'Upload Media'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManagement;
