import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  Bed,
  Users,
  DollarSign,
  Square,
  Star
} from 'lucide-react';
import { rooms } from '../../data/rooms';
import { Room } from '../../types';

const RoomManagement: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>(rooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterView, setFilterView] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filteredRooms = roomList.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type.toLowerCase() === filterType.toLowerCase();
    const matchesView = filterView === 'all' || room.view === filterView;
    
    return matchesSearch && matchesType && matchesView;
  });

  const handleDeleteRoom = (roomId: string) => {
    setRoomList(roomList.filter(room => room.id !== roomId));
    setShowDeleteModal(null);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setShowAddModal(true);
  };

  const getStatusColor = (isOccupied: boolean) => {
    return isOccupied 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  const getStatusText = (isOccupied: boolean) => {
    return isOccupied ? 'Occupied' : 'Available';
  };

  return (
    <div className="space-y-6 -mt-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-1">Manage your hotel rooms, pricing, and availability.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Room
        </button>
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
                placeholder="Search rooms..."
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
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="twin">Twin</option>
              <option value="triple">Triple</option>
              <option value="budget">Budget</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
            <select
              value={filterView}
              onChange={(e) => setFilterView(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Views</option>
              <option value="forest">Forest</option>
              <option value="garden">Garden</option>
              <option value="mountain">Mountain</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const isOccupied = false; // This would come from booking data
          
          return (
            <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Room Image */}
              <div className="relative h-48">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(isOccupied)}`}>
                    {getStatusText(isOccupied)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 text-xs font-semibold bg-white bg-opacity-90 rounded-full text-gray-700">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                {/* Room Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Square className="h-4 w-4 mr-2" />
                    <span>{room.size} m²</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">BB Rate:</span>
                    <span className="font-semibold text-gray-900">${room.price}/night</span>
                  </div>
                  {room.priceHalfBoard && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">HB Rate:</span>
                      <span className="font-semibold text-gray-900">${room.priceHalfBoard}/night</span>
                    </div>
                  )}
                  {room.priceFullBoard && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">FB Rate:</span>
                      <span className="font-semibold text-gray-900">${room.priceFullBoard}/night</span>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button 
                    onClick={() => handleEditRoom(room)}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(room.id)}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Room
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Room</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this room? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRoom(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Room Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>
            <p className="text-gray-600 mb-6">
              Room form would go here with all the necessary fields for creating/editing rooms.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRoom(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRoom(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {editingRoom ? 'Update Room' : 'Create Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
