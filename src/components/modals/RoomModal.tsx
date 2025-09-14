import React, { useState } from 'react';
import { Room } from '../../types';
import Modal from './Modal';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: Room;
  onSave: (room: Partial<Room>) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ isOpen, onClose, room, onSave }) => {
  const [formData, setFormData] = useState<Partial<Room>>(
    room || {
      name: '',
      description: '',
      price: 0,
      priceHalfBoard: 0,
      priceFullBoard: 0,
      capacity: 1,
      images: [''],
      amenities: [],
      size: 0,
      type: '',
      view: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'priceHalfBoard' || name === 'priceFullBoard' || name === 'capacity' || name === 'size'
        ? Number(value)
        : value
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={room ? 'Edit Room' : 'Add New Room'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Night</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Half Board Price</label>
            <input
              type="number"
              name="priceHalfBoard"
              value={formData.priceHalfBoard}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Board Price</label>
            <input
              type="number"
              name="priceFullBoard"
              value={formData.priceFullBoard}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select Type</option>
              <option value="SINGLE">Single</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Twin Bed">Twin Bed</option>
              <option value="Tripple Bed">Triple Bed</option>
              <option value="Budget Single Room">Budget Single</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">View</label>
            <select
              name="view"
              value={formData.view}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select View</option>
              <option value="forest">Forest</option>
              <option value="garden">Garden</option>
              <option value="ocean">Ocean</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Room Size (m²)</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
          >
            {room ? 'Save Changes' : 'Add Room'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomModal; 