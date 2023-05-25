import React, { useRef, useState } from 'react';
import './ImageUpload.css';

const ImageUpload = () => {

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
    };

    const deleteImage = (ind) => {
        setImages(images.filter((img, i) => i !== ind));
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };
    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };
    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
    };

    return (
        <div className='card'>
            <div className='top'>
                <p>Drag & Drop image uploading</p>
            </div>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} >
                {isDragging ? (
                    <span className='select'>
                        Drop images here
                    </span>
                ) : (
                    <>
                        Drag and Drop image here or {" "}
                        <span className='select' role='button' onClick={selectFiles}>
                            Browse
                        </span>
                    </>
                )}
                <input type="file" className="file" ref={fileInputRef} onChange={onFileSelect} multiple />
            </div>
            <div className='container'>
                {images.map((img, ind) => (
                    <div className='image' key={ind}>
                        <span className='delete' onClick={() => deleteImage(ind)} >&times;</span>
                        <img src={img.url} alt={img.name} />
                    </div>
                ))}
            </div>
            {/* <button type='button' >
                Upload
            </button> */}
        </div>
    )
}

export default ImageUpload;