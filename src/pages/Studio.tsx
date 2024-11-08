import { useState } from 'react';
import { CloudArrowUpIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Studio() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-lg mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Tam Tam Studio</h1>
          <p className="text-gray-400">Create and manage your content</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <CloudArrowUpIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-lg font-medium text-white">Upload Video</h2>
                <p className="text-sm text-gray-400">Share your creativity with the world</p>
              </div>
            </div>

            <label className="block w-full p-4 border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="text-center">
                {selectedFile ? (
                  <p className="text-purple-500">{selectedFile.name}</p>
                ) : (
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                )}
              </div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
              <ChartBarIcon className="w-8 h-8 text-purple-500 mb-4" />
              <h2 className="text-lg font-medium text-white mb-2">Analytics</h2>
              <p className="text-sm text-gray-400">Track your performance</p>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
              <CogIcon className="w-8 h-8 text-purple-500 mb-4" />
              <h2 className="text-lg font-medium text-white mb-2">Settings</h2>
              <p className="text-sm text-gray-400">Customize your studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}