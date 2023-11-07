import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image }: any) => {
  const [img] = useImage(image.src);
  return (
    <KonvaImage
      draggable={true}
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const BackgroundImage = ({ uploadedImage }: any) => {
  console.log({uploadedImage})
  const [image] = useImage(uploadedImage);
  return <KonvaImage image={image} />;
};

const MyCanva = () => {
  const dragUrl: any = React.useRef();
  const stageRef: any = React.useRef();
  const [images, setImages] = React.useState<any>([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [height, setHeight] = useState();
  const [width,setWidth] = useState();

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image() as HTMLImageElement;
        image.src = e.target.result;
  
        image.onload = () => {
          const width:any = image.naturalWidth;
          const height: any = image.naturalHeight;
          setWidth(width)
          setHeight(height)
          // Now you can use 'width' and 'height' as the dimensions of the image.
          
  
          setUploadedImage(e.target.result);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, 'stage.png');
  };

  function downloadURI(uri: any, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      Try to drag an image into the stage:
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e: any) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        style={{ width: width, height:height }}
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={width}
          height={height}
          className='bg-red-100'
          ref={stageRef}
        >
          <Layer>
            <BackgroundImage uploadedImage={uploadedImage} />
            {images.map((image: any) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
      {uploadedImage && <button onClick={handleExport}>Click here to log stage data URL</button>}
    </div>
  );
};

export default MyCanva;
