'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';

export default function UploadsPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(`✓ Uploaded: ${result.path}`);
        e.currentTarget.reset();
      } else {
        setMessage(`✗ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('✗ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">Media Upload</h1>
            <p className="text-neutral-600">Upload and manage media files</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mb-4"></div>
              <p className="text-neutral-600">Loading...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-1">Media Upload</h1>
          <p className="text-neutral-600">Upload and manage media files</p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
              <select 
                name="category" 
                required
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="tours">Tours</option>
                <option value="apartments">Apartments</option>
                <option value="airlines">Airlines</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">File</label>
              <input
                type="file"
                name="file"
                required
                accept="image/*"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-sm text-neutral-600 mt-2">
                Supported: JPG, PNG, SVG, WebP (max 5MB)
              </p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${message.startsWith('✓') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-3">Upload Guidelines</h3>
          <ul className="text-sm text-red-800 space-y-2">
            <li>• Tours: Use landscape images (1200x800px recommended)</li>
            <li>• Apartments: High-quality interior/exterior photos</li>
            <li>• Airlines: Logo files (SVG preferred, transparent background)</li>
            <li>• Optimize images before upload for best performance</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
