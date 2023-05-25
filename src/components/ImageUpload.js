import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ images, setImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file || file.type.split('/')[0] !== 'image') return;
    if (!images.some((e) => e.name === file.name)) {
      setImages((prevImages) => [
        // ...prevImages,
        {
          name: file.name,
          url: URL.createObjectURL(file),
          files: file,
        },
      ]);
      setSelectedImage(file);
    }
  };

  const deleteImage = (ind) => {
    setImages(images.filter((img, i) => i !== ind));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (!file || file.type.split('/')[0] !== 'image') return;
    if (!images.some((e) => e.name === file.name)) {
      setImages((prevImages) => [
        // ...prevImages,
        {
          name: file.name,
          url: URL.createObjectURL(file),
          files: file,
        },
      ]);
      setSelectedImage(file);
    }
  };

  return (
    <div className="card">
      <div className="top">
        <p>Drag & Drop image uploading</p>
      </div>
      <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (
          <span className="select">Drop images here</span>
        ) : (
          <>
            Drag and Drop image here or{' '}
            <span className="select" role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}
        <input type="file" className="file" ref={fileInputRef} onChange={onFileSelect} />
      </div>
      <div className="container">
        {images.map((img, ind) => (
          <div className="image" key={ind}>
            <span
              className="delete"
              onClick={() => {
                setImages(images.filter((img, i) => i !== ind));
                setSelectedImage(null);
              }}
            >
              &times;
            </span>
            <img
              src={img.url}
              alt={img.name}
              style={selectedImage === img ? { border: '1px solid red' } : {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
