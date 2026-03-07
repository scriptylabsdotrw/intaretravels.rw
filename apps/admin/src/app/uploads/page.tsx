'use client';

import { useState } from 'react';

export default function UploadsPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Media Upload</h1>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Category</label>
              <select 
                name="category" 
                required
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="tours">Tours</option>
                <option value="apartments">Apartments</option>
                <option value="airlines">Airlines</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">File</label>
              <input
                type="file"
                name="file"
                required
                accept="image/*"
                className="w-full border rounded-lg px-4 py-2"
              />
              <p className="text-sm text-neutral-600 mt-2">
                Supported: JPG, PNG, SVG, WebP (max 5MB)
              </p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${message.startsWith('✓') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold mb-2">Upload Guidelines</h3>
          <ul className="text-sm text-neutral-700 space-y-1">
            <li>• Tours: Use landscape images (1200x800px recommended)</li>
            <li>• Apartments: High-quality interior/exterior photos</li>
            <li>• Airlines: Logo files (SVG preferred, transparent background)</li>
            <li>• Optimize images before upload for best performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
