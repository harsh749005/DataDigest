import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

export default function FileUpload({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag & drop a CSV/Excel file here, or click to upload</p>
    </div>
  );
}
