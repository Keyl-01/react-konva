import { Layer, Circle ,Line } from 'react-konva'
import Konva from 'konva'
import { useState } from 'react';
import Rectangle from './Rectangle';


const initialRectangles = [
    {
      x: 800,
      y: 100,
      width: 100,
      height: 100,
      fill: 'rgba(225,0,0,0.3)',
      id: 'rect1'
    }
];

function BoundingBox({ selectedNull }) {
    const [selectedId, selectShape] = useState(selectedNull);
    const [rectangles, setRectangles] = useState(initialRectangles)

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
    };

    return (
        <>
            {rectangles.map((rect, i) => (
                <Rectangle
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                        selectShape(rect.id);
                    }}
                    onChange={(newAttrs) => {
                        const rects = rectangles.slice();
                        rects[i] = newAttrs;
                        setRectangles(rects);
                    }}
                />
            ))}
        </>  
    ) 
}

export default BoundingBox