'use client';
import { useState } from 'react';
import FileUpload from './component/FileUpload';

export default function Home() {
  const [summary, setSummary] = useState('');

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/analyze`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">📊 DataDigest</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {summary && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-semibold">AI Summary:</h2>
          <p className='text-black'>{summary}</p>
        </div>
      )}
    </div>
  );
}
