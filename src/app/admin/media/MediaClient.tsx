"use client";

import React, { useState } from 'react';
import { Download, Copy, Image as ImageIcon, FileText, Check, Trash2, Archive } from 'lucide-react';

export default function MediaClient({ initialMedia }: { initialMedia: any[] }) {
  const [mediaFiles, setMediaFiles] = useState(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleArchive = (id: string) => {
    if (confirm("Are you sure you want to archive/hide this image from the library?")) {
      setMediaFiles(prev => prev.filter(m => m.id !== id));
      // In a real app, hit an API to mark as archived.
      // Here we just remove it from the view for now as requested by user.
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      {mediaFiles.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No media uploaded yet. Start by uploading images or PDFs in the product/collection sections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mediaFiles.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden group bg-gray-50 hover:shadow-md transition-shadow">
              <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                {file.type === 'application/pdf' ? (
                  <FileText className="w-16 h-16 text-red-500" />
                ) : (
                  <img 
                    src={file.url} 
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => copyToClipboard(file.id, file.url)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-green-600 transition-colors"
                    title="Copy Link"
                  >
                    {copiedId === file.id ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                  <a 
                    href={file.url} 
                    download={file.filename}
                    target="_blank"
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-orange-600 transition-colors"
                    title="Download"
                  >
                    <Download size={18} />
                  </a>
                  <button 
                    onClick={() => handleArchive(file.id)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-colors"
                    title="Archive Image"
                  >
                    <Archive size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-700 truncate" title={file.filename}>{file.filename}</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase flex justify-between">
                  <span>{file.type?.split('/')[1] || 'IMAGE'}</span>
                  <span>{file.size ? (file.size / 1024).toFixed(1) + ' KB' : 'N/A'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
