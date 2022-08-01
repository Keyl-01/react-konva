import { Rect, Transformer, Circle, Line, Group } from 'react-konva'
import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import Point from './Point'

const Rectang = ({ points, isSelected, shapeProps, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
  
    useEffect(() => {
    console.log(shapeRef.current)
      if (isSelected) {
        console.log(shapeRef.current.x())
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);

    // console.log(shapeRef.current.x())
  
    return (
      <>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragMove={(e) => {
            // console.log('Reac x: ', e.target.x());
            // console.log('Reac y: ', e.target.y());

            points.map(point => {
              point.x = (point.tilex * e.target.width()) + e.target.x()
              point.y = (point.tiley * e.target.height()) + e.target.y()
            })

            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
              points: [...points]
            });
          }}

          onTransform={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            points.map(point => {
              point.x = (point.tilex * e.target.width()) + e.target.x()
              point.y = (point.tiley * e.target.height()) + e.target.y()
            })
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
              points: [...points]
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            id={4}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}

        <Point 
          shapeProps={shapeProps}
          points={points}
          onChange={(newAttrs) => {
            onChange({
              ...shapeProps,
              points: [...newAttrs]
            });
          }}
        />

        {/* {points.map(point => (
              <Line 
                points={[point.x, point.y, points[point.next].x, points[point.next].y]}
                stroke='black'
                strokeWidth={2}
                lineCap='round'
                lineJoin='round'
              />
            ))
          }
          {points.map(point => (
              <Circle 
                id={point.id}
                x={point.x}
                y={point.y}
                radius={point.radius}
                fill={point.fill}
                stroke={point.stroke}
                strokeWidth={point.strokeWidth}
                draggable
              />
            ))
          } */}
      </>
    );
  };

export default Rectang