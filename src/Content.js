import { Stage, Layer ,Circle ,Line } from 'react-konva'
import Konva from 'konva'
import { useState } from 'react';


const circles = [
  {
    id: 0,
    x: 300,
    y: 300
  },
  {
    id: 1,
    x: 500,
    y: 500
  }
]


function Content() {
  const [points, setPoints] = useState(circles)

  const handleDragMove = e => {
    const id = e.target.attrs.id
    // console.log(id);
    circles[id].x = e.target.attrs.x
    circles[id].y = e.target.attrs.y
    setPoints([...circles])

    // console.log(circles[id].x, circles[id].y);
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
      <Line 
          points={[points[0].x, points[0].y, points[1].x, points[1].y]}
          stroke={'black'}
          strokeWidth={2}
          lineCap={'round'}
          lineJoin={'round'}
        />
        {points.map((point) => (
          <Circle
            key={point.id}
            id={point.id}
            x={point.x}
            y={point.y}
            draggable
            radius={3}
            fill={'white'}
            stroke={'black'}
            strokeWidth={3}
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            onDragMove={handleDragMove}
          />
        ))}
        
      </Layer>
    </Stage>
  ) 
}

export default Content