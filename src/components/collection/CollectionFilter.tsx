import React from 'react';
import type { CollectionFilter, CollectionSort } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CollectionFilterProps {
  filter: CollectionFilter;
  sort: CollectionSort;
  onFilterChange: (filter: CollectionFilter) => void;
  onSortChange: (sort: CollectionSort) => void;
  onReset: () => void;
}

const CollectionFilterComponent: React.FC<CollectionFilterProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onReset
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Filter & Sort</h3>
        <Button
          onClick={onReset}
          variant="secondary"
          size="sm"
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Card Name
          </label>
          <Input
            type="text"
            placeholder="Search cards..."
            value={filter.cardName || ''}
            onChange={(e) => onFilterChange({ ...filter, cardName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Min Grade
          </label>
          <Input
            type="number"
            min="1"
            max="10"
            placeholder="1-10"
            value={filter.minGrade || ''}
            onChange={(e) => onFilterChange({ ...filter, minGrade: Number(e.target.value) || undefined })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Max Grade
          </label>
          <Input
            type="number"
            min="1"
            max="10"
            placeholder="1-10"
            value={filter.maxGrade || ''}
            onChange={(e) => onFilterChange({ ...filter, maxGrade: Number(e.target.value) || undefined })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Min Value ($)
          </label>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={filter.minValue || ''}
            onChange={(e) => onFilterChange({ ...filter, minValue: Number(e.target.value) || undefined })}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Sort By
          </label>
          <select
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort.field}
            onChange={(e) => onSortChange({ ...sort, field: e.target.value as CollectionSort['field'] })}
          >
            <option value="date">Date Added</option>
            <option value="grade">Grade</option>
            <option value="value">Value</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Direction
          </label>
          <select
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort.direction}
            onChange={(e) => onSortChange({ ...sort, direction: e.target.value as 'asc' | 'desc' })}
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CollectionFilterComponent;