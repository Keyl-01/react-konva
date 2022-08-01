import { Circle ,Line } from 'react-konva'
import Konva from 'konva'
import { useRef, useState } from 'react';


function Point({ points, shapeProps, onChange }) {
  // const [drawPoints, setDrawPoints] = useState(points)

  const handleDragMove = e => {
    const id = e.target.attrs.id - 1
    // console.log(id);
    points[id].x = e.target.attrs.x
    points[id].y = e.target.attrs.y

    const tilex = (points[id].x - shapeProps.x) / shapeProps.width
    const tiley = (points[id].y - shapeProps.y) / shapeProps.height
    // console.log(drawPoints[id].x);
    // console.log(shapeProps.x);
    // console.log(tilex);

    points[id].tilex = tilex
    points[id].tiley = tiley

    onChange([...points])

    // setDrawPoints([...drawPoints])

    // console.log(circles[id].x, circles[id].y);
  }

  const handleMouseOver = () => {
    document.body.style.cursor = 'pointer'
  }

  const handleMouseOut = () => {
    document.body.style.cursor = 'default'
  }

  return (
    <>
      {points.map(point => (
              <Line 
                points={[point.x, point.y, points[point.next].x, points[point.next].y]}
                stroke='black'
                strokeWidth={2}
                lineCap='round'
                lineJoin='round'
              />
            ))
          }
          {points.map((point, index) => (
              <Circle 
                id={index+1}
                x={point.x}
                y={point.y}
                radius={point.radius}
                fill={point.fill}
                stroke={point.stroke}
                strokeWidth={point.strokeWidth}
                draggable
                onDragMove={handleDragMove}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            ))
          }
        {/* {points.map((point) => (
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
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ))} */}
    </>
  ) 
}

export default Point