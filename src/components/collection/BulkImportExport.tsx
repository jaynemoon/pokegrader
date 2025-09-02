import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Upload, Download } from 'lucide-react';
import type { SavedCard } from '../../types';
import Button from '../ui/Button';

interface BulkImportExportProps {
  savedCards: SavedCard[];
  onImport: (cards: Partial<SavedCard>[]) => void;
}

const BulkImportExport: React.FC<BulkImportExportProps> = ({ savedCards, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExportCSV = () => {
    const csvContent = [
      ['Card Name', 'Grade', 'Estimated Value', 'Date Saved', 'Centering', 'Corners', 'Edges', 'Surface'].join(','),
      ...savedCards.map(card => [
        `"${card.cardName}"`,
        card.overallGrade,
        card.estimatedValue,
        `"${card.dateSaved}"`,
        card.breakdown.centering.score,
        card.breakdown.corners.score,
        card.breakdown.edges.score,
        card.breakdown.surface.score
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemon-collection-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const exportData = savedCards.map(card => ({
      cardName: card.cardName,
      overallGrade: card.overallGrade,
      estimatedValue: card.estimatedValue,
      breakdown: card.breakdown,
      dateSaved: card.dateSaved,
      confidence: card.confidence
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemon-collection-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedCards: Partial<SavedCard>[] = [];

        if (file.name.endsWith('.json')) {
          importedCards = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          lines[0].split(','); // headers
          
          importedCards = lines.slice(1).filter(line => line.trim()).map((line, index) => {
            const values = line.split(',');
            return {
              id: Date.now() + index,
              cardName: values[0].replace(/"/g, ''),
              overallGrade: parseInt(values[1]),
              estimatedValue: parseFloat(values[2]),
              dateSaved: values[3].replace(/"/g, ''),
              breakdown: {
                centering: { score: parseInt(values[4]), description: 'Imported' },
                corners: { score: parseInt(values[5]), description: 'Imported' },
                edges: { score: parseInt(values[6]), description: 'Imported' },
                surface: { score: parseInt(values[7]), description: 'Imported' }
              },
              confidence: 85,
              image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" fill="%23E5E7EB"%3E%3Crect width="200" height="280" rx="12" fill="%23F3F4F6"/%3E%3Ctext x="100" y="140" text-anchor="middle" fill="%23374151" font-size="12"%3EImported Card%3C/text%3E%3C/svg%3E',
              userId: 1
            };
          });
        }

        onImport(importedCards);
        alert(`Successfully imported ${importedCards.length} cards!`);
      } catch {
        alert('Error importing file. Please check the format and try again.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {isExpanded ? <Upload className="w-4 h-4 text-blue-600" /> : <Download className="w-4 h-4 text-blue-600" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Bulk Import/Export</h3>
            <p className="text-sm text-slate-600">Manage your collection data</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
          <div className="pt-4">
            <div className="flex flex-wrap gap-3 mb-4">
              <Button onClick={handleExportCSV} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              
              <Button onClick={handleExportJSON} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="primary"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import File
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleImportFile}
                className="hidden"
              />
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-600">
                <strong>Export:</strong> Download your collection as CSV or JSON. <br />
                <strong>Import:</strong> Upload cards from CSV/JSON files. <br />
                <strong>CSV format:</strong> Card Name, Grade, Value, Date, Centering, Corners, Edges, Surface
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkImportExport;