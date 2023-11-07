import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';
// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri: any, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ImageDownloading = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stageRef: any = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, 'stage.png');
  };

  const LionImage = () => {
    const [image] = useImage('https://konvajs.org/assets/lion.png');
    return <Image image={image} />;
  };

  return (
    <Fragment>
      <button onClick={handleExport}>Click here to log stage data URL</button>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer style={{ backgroundImage: `url(${'https://res.cloudinary.com/instagramcloude/image/upload/v1699347574/8552347_3608788_hosuvh.jpg'})`}}>
          <LionImage />
          <Rect x={0} y={0} width={80} height={80} fill="red" />
          <Rect x={width - 80} y={0} width={80} height={80} fill="red" />
          <Rect
            x={width - 80}
            y={height - 80}
            width={80}
            height={80}
            fill="red"
          />
          <Rect x={0} y={height - 80} width={80} height={80} fill="red" />
        </Layer>
      </Stage>
    </Fragment>
  );
};
export default ImageDownloading