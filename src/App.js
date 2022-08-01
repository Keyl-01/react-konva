// import logo from './logo.svg';
import './App.css';
import Content from './Content';
import { Stage, Layer, Rect, Transformer, Line, Circle } from 'react-konva'
import BoundingBox from './BoundingBox';
import { useEffect, useRef, useState } from 'react';
import Rectang from './Rectang';


function App() {
  const [pointer, setPointer] = useState({x:-1,y:-1});
  const [selectedId, selectShape] = useState(null);

  const [clickId, setClickId] = useState(null);
  const [createRectangleStatus, setCreateRectangleStatus] = useState(false);
  const [createRectangle, setCreateRectangle] = useState({});
  const [createPoints, setCreatePoints] = useState({});
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

      setCreateRectangle(prev => {
        prev.width = width
        prev.height = height
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
      setCreatePoints({
        id: '' + (rectangles.length + 1),
        x,
        y,
        radius: 3,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 3
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            // onDragMove={handleDragMove}
            // onMouseOver={handleMouseOver}
            // onMouseOut={handleMouseOut}
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

        let xPointNew, yPointNew
        if (createRectangle.width!=0 && createRectangle.height!=0) {
          // const tilex = (createPoints.x - createRectangle.x) / createRectangle.width
          xPointNew = (0.5 * width) + createRectangle.x

          // const tiley = (createPoints.y - createRectangle.y) / createRectangle.height
          yPointNew = (0.5 * height) + createRectangle.y

          console.log(createPoints.x, createPoints.y);

          setCreatePoints(prev => {
            prev.x = xPointNew
            prev.y = yPointNew
            return prev
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
          {createRectangleStatus && <Circle {...createPoints}/>}
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