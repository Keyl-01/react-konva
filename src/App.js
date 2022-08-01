// import logo from './logo.svg';
import './App.css';
import Konva from 'konva';
import { Stage, Layer, Rect, Transformer, Line, Circle, Image } from 'react-konva'
// import useImage from 'use-image';
import BoundingBox from './BoundingBox';
import { useEffect, useRef, useState } from 'react';
import Rectang from './Rectang';


const tile = [
  // Dau
  {
    tilex: 0.5,
    tiley: 0.1,
    next: 1
  },
  // Tay
  {
    tilex: 0.5,
    tiley: 0.3,
    next: 6
  },
  {
    tilex: 0.2,
    tiley: 0.5,
    next: 3
  },
  {
    tilex: 0.4,
    tiley: 0.4,
    next: 1
  },
  {
    tilex: 0.8,
    tiley: 0.5,
    next: 5
  },
  {
    tilex: 0.6,
    tiley: 0.4,
    next: 1
  },
  // Chan
  {
    tilex: 0.5,
    tiley: 0.7,
    next: 6
  },
  {
    tilex: 0.3,
    tiley: 0.9,
    next: 8
  },
  {
    tilex: 0.4,
    tiley: 0.8,
    next: 6
  },
  {
    tilex: 0.7,
    tiley: 0.9,
    next: 10
  },
  {
    tilex: 0.6,
    tiley: 0.8,
    next: 6
  },
]


function App() {
  const [pointer, setPointer] = useState({x:-1,y:-1});
  const [selectedId, selectShape] = useState(null);

  const [clickId, setClickId] = useState(null);
  const [createRectangleStatus, setCreateRectangleStatus] = useState(false);
  const [createRectangle, setCreateRectangle] = useState({});
  const [createPoints, setCreatePoints] = useState([]);
  const [rectangles, setRectangles] = useState([]);

  const nameStage = useRef()

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    // console.log(clickedOnEmpty);
    if (clickedOnEmpty) {
      document.body.style.cursor = 'default'
      selectShape(null);
    } else {
      document.body.style.cursor = 'pointer'
      selectShape(e.target.attrs.id);
    }
  };

  const handlePointerUp = () => {
    if(createRectangleStatus) {
      const pointerPos = nameStage.current.getPointerPosition()
      const x = pointerPos.x
      const y = pointerPos.y
      const width = x - createRectangle.x
      const height = y - createRectangle.y
      // console.log(pointerPos.x, pointerPos.y)

      setCreatePoints(prev => {
        const points = []
        prev.map(point => {
          point.x = (point.tilex * width) + createRectangle.x
          point.y = (point.tiley * height) + createRectangle.y
          points.push(point)
        })
        return points
      })

      setCreateRectangle(prev => {
        prev.width = width
        prev.height = height
        prev.points = createPoints
        return prev
      })

      setRectangles([...rectangles ,createRectangle])
      setCreateRectangleStatus(false)
    }
  }

  const handlePointerDown = () => {
    // console.log(selectedId);
    if (!selectedId && !(selectedId === undefined)) {
      const pointerPos = nameStage.current.getPointerPosition()
      const x = pointerPos.x
      const y = pointerPos.y
      // console.log(pointerPos.x, pointerPos.y);
      setCreateRectangle({
        id: '' + (rectangles.length + 1),
        x,
        y,
        width: 0,
        height: 0,
        fill: "rgba(225,0,0,0.3)",
        stroke: 'red',
        strokeWidth: 0.5
      })
      
      setCreatePoints(() => {
        const points = []
        for (let i = 0; i < 11; i++) {
          points.push({
            id: '' + (i),
            x,
            y,
            radius: 3,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 3,
            ...tile[i]
          })
        }
        return points
      })
      setCreateRectangleStatus(true)
    }
  }

  const handlePointerMove = () => {
    // console.log(selectedId, createRectangleStatus);
    if (!selectedId || createRectangleStatus) {
      const pointerPos = nameStage.current.getPointerPosition()
      const x = pointerPos.x
      const y = pointerPos.y
      // console.log(pointerPos.x, pointerPos.y);
      setPointer({x,y})
    } else if (selectedId) {
      setPointer({x:-1,y:-1})
    } 


    // console.log(createRectangleStatus);
      if (createRectangleStatus) {
        const pointerPos = nameStage.current.getPointerPosition()
        const x = pointerPos.x
        const y = pointerPos.y
        const width = x - createRectangle.x
        const height = y - createRectangle.y
        // console.log(pointerPos.x, pointerPos.y)

        // console.log(createRectangle)

        if (createRectangle.width!=0 && createRectangle.height!=0) {
          setCreatePoints(prev => {
            // for (let i = 0; i < 11; i++) {
            //   prev[i].x = (prev[i].tilex * width) + createRectangle.x
            //   prev[i].y = (prev[i].tiley * height) + createRectangle.y
            // }

            const points = []
            prev.map(point => {
              point.x = (point.tilex * width) + createRectangle.x
              point.y = (point.tiley * height) + createRectangle.y
              points.push(point)
              // console.log(createPoints[point.next]);
            })
            console.log(points);
            return points
          })
        }


        // console.log(createRectangle.width, createRectangle.height);

        setCreateRectangle(prev => {
          prev.width = width
          prev.height = height
          return prev
        })

        

        console.log(createPoints);
      }
    // console.log(selectedId)
  }

  // function drawImage(imageObj) {
  //   var stage = new Konva.Stage({
  //     container: 'container',
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // }

  // var imageObj = new Image();
  //     imageObj.onload = function () {
  //       drawImage(this);
  //     };
  //     imageObj.src = './public/images.jpeg';

  // const [image] = useImage('https://konvajs.org/assets/lion.png');

  return (
    <div>
      <Stage 
        ref={nameStage}
        width={window.innerWidth} 
        height={window.innerHeight}
        onMouseMove={checkDeselect}
        // onMouseDown={checkDeselect}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <Layer>
          {/* <Image 
            image={image}
            x={window.innerWidth / 2}
            y={window.innerWidth / 2}
            width={200}
            height={137}
            draggable
          /> */}

        {rectangles.map((rectangle, i) => (
          <Rectang 
            key={rectangle.id}
            shapeProps = {rectangle}
            // id={(rectangle.id).toString()}
            // x={rectangle.x}
            // y={rectangle.y}
            // width={rectangle.width}
            // height={rectangle.height}
            // fill={rectangle.fill}
            // stroke={rectangle.stroke}
            // strokeWidth={rectangle.strokeWidth}
            points={rectangle.points}

            isSelected={rectangle.id === clickId}
            onSelect={() => {
              // setCreateRectangleStatus(false)
              setClickId(rectangle.id);
            }}
            onChange={(newAttrs) => {
              // setCreateRectangleStatus(false)
              const rects = rectangles.slice();
              rects[i] = newAttrs;
              setRectangles(rects);
            }}
            // onSelect={handleClick}
          />
        ))}

          {createRectangleStatus && <Rect {...createRectangle}/>}
          {createRectangleStatus && 
            createPoints.map(point => (
              <Line 
                points={[point.x, point.y, createPoints[point.next].x, createPoints[point.next].y]}
                stroke='black'
                strokeWidth={2}
                lineCap='round'
                lineJoin='round'
              />
            ))
          }
          {createRectangleStatus && 
            createPoints.map(point => (
              <Circle 
                id={point.id}
                x={point.x}
                y={point.y}
                radius={point.radius}
                fill={point.fill}
                stroke={point.stroke}
                strokeWidth={point.strokeWidth}
              />
            ))
          }
              <Line 
                points={[pointer.x, 0, pointer.x, window.innerHeight]}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth={1}
                lineJoin="round"
                dash={[6, 3]}
              />
              <Line 
                points={[0, pointer.y, window.innerWidth, pointer.y]}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth={1}
                lineJoin="round"
                dash={[6, 3]}
              />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { Stage, Layer, Rect, Text, Shape } from 'react-konva';
// import Konva from 'konva';

// class ColoredRect extends React.Component {
//   state = {
//     color: 'green'
//   };
//   handleClick = () => {
//     this.setState({
//       color: Konva.Util.getRandomColor()
//     });
//   };
//   render() {
//     return (
//       <Rect
//         x={20}
//         y={20}
//         width={50}
//         height={50}
//         fill={this.state.color}
//         shadowBlur={5}
//         onClick={this.handleClick}
//       />
//     );
//   }
// }

// class App extends Component {
//   render() {
//     // Stage is a div container
//     // Layer is actual canvas element (so you may have several canvases in the stage)
//     // And then we have canvas shapes inside the Layer
//     return (
//       <Stage width={window.innerWidth} height={window.innerHeight}>
//         <Layer>
//           <Text text="Try click on rect" />
//           <ColoredRect />
//         </Layer>
//       </Stage>
//     );
//   }
// }

// render(<App />, document.getElementById('root'));