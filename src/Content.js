import { Circle ,Line } from 'react-konva'
import Konva from 'konva'
import { useRef, useState } from 'react';


function Content() {
  const circles = useRef()
  circles.current = [
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

  const [points, setPoints] = useState(circles.current)

  const handleDragMove = e => {
    const id = e.target.attrs.id
    // console.log(id);
    circles.current[id].x = e.target.attrs.x
    circles.current[id].y = e.target.attrs.y
    setPoints([...circles.current])

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
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ))}
    </>
  ) 
}

export default Content