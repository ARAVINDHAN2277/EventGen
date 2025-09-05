import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Rect, Circle } from 'react-konva';
import { 
  Type, 
  Image, 
  Square, 
  Circle as CircleIcon, 
  Download, 
  Palette,
  RotateCcw,
  Trash2,
  Copy,
  Move,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { SketchPicker } from 'react-color';
import { CanvasElement, CanvasDesign } from '../../types';

interface CanvasEditorProps {
  design: CanvasDesign;
  onDesignChange: (design: CanvasDesign) => void;
  eventData: any;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({ design, onDesignChange, eventData }) => {
  const stageRef = useRef<any>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  const addTextElement = () => {
    const newElement: CanvasElement = {
      id: `text_${Date.now()}`,
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      content: 'Click to edit',
      fontSize: 24,
      fontFamily: 'Inter',
      fill: '#000000',
      zIndex: design.elements.length
    };

    onDesignChange({
      ...design,
      elements: [...design.elements, newElement]
    });
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle') => {
    const newElement: CanvasElement = {
      id: `${shapeType}_${Date.now()}`,
      type: 'shape',
      x: 150,
      y: 150,
      width: shapeType === 'circle' ? 100 : 150,
      height: shapeType === 'circle' ? 100 : 100,
      fill: '#3B82F6',
      zIndex: design.elements.length
    };

    onDesignChange({
      ...design,
      elements: [...design.elements, newElement]
    });
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    const updatedElements = design.elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    );

    onDesignChange({
      ...design,
      elements: updatedElements
    });
  };

  const deleteElement = (id: string) => {
    const filteredElements = design.elements.filter(el => el.id !== id);
    onDesignChange({
      ...design,
      elements: filteredElements
    });
    setSelectedElement(null);
  };

  const duplicateElement = (id: string) => {
    const element = design.elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: `${element.type}_${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20,
        zIndex: design.elements.length
      };

      onDesignChange({
        ...design,
        elements: [...design.elements, newElement]
      });
    }
  };

  const exportDesign = async () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${eventData.title || 'event'}_invitation.png`;
      link.href = dataURL;
      link.click();
    }
  };

  const selectedElementData = design.elements.find(el => el.id === selectedElement);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={addTextElement}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Add Text"
        >
          <Type className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => addShapeElement('rectangle')}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Add Rectangle"
        >
          <Square className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => addShapeElement('circle')}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Add Circle"
        >
          <CircleIcon className="w-5 h-5" />
        </button>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <button
            onClick={() => setZoom(zoom * 1.2)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setZoom(zoom * 0.8)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={exportDesign}
            className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            title="Export Design"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {Math.round(zoom * 100)}% zoom
            </span>
            {selectedElement && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => duplicateElement(selectedElement)}
                  className="p-1 rounded hover:bg-gray-100"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteElement(selectedElement)}
                  className="p-1 rounded hover:bg-gray-100 text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <Stage
            ref={stageRef}
            width={window.innerWidth - 16 - (selectedElement ? 300 : 0)}
            height={window.innerHeight - 100}
            scaleX={zoom}
            scaleY={zoom}
            x={stagePos.x}
            y={stagePos.y}
            draggable
            onDragEnd={(e) => setStagePos({ x: e.target.x(), y: e.target.y() })}
            onClick={(e) => {
              if (e.target === e.target.getStage()) {
                setSelectedElement(null);
              }
            }}
          >
            <Layer>
              {/* Background */}
              <Rect
                width={design.width}
                height={design.height}
                fill={design.background}
              />

              {/* Elements */}
              {design.elements
                .sort((a, b) => a.zIndex - b.zIndex)
                .map((element) => {
                  if (element.type === 'text') {
                    return (
                      <Text
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        text={element.content}
                        fontSize={element.fontSize}
                        fontFamily={element.fontFamily}
                        fill={element.fill}
                        draggable
                        onClick={() => setSelectedElement(element.id)}
                        onDragEnd={(e) => {
                          updateElement(element.id, {
                            x: e.target.x(),
                            y: e.target.y()
                          });
                        }}
                        stroke={selectedElement === element.id ? '#3B82F6' : undefined}
                        strokeWidth={selectedElement === element.id ? 2 : 0}
                      />
                    );
                  }

                  if (element.type === 'shape') {
                    if (element.width === element.height) {
                      // Circle
                      return (
                        <Circle
                          key={element.id}
                          x={element.x + element.width / 2}
                          y={element.y + element.height / 2}
                          radius={element.width / 2}
                          fill={element.fill}
                          draggable
                          onClick={() => setSelectedElement(element.id)}
                          onDragEnd={(e) => {
                            updateElement(element.id, {
                              x: e.target.x() - element.width / 2,
                              y: e.target.y() - element.height / 2
                            });
                          }}
                          stroke={selectedElement === element.id ? '#3B82F6' : undefined}
                          strokeWidth={selectedElement === element.id ? 2 : 0}
                        />
                      );
                    } else {
                      // Rectangle
                      return (
                        <Rect
                          key={element.id}
                          x={element.x}
                          y={element.y}
                          width={element.width}
                          height={element.height}
                          fill={element.fill}
                          draggable
                          onClick={() => setSelectedElement(element.id)}
                          onDragEnd={(e) => {
                            updateElement(element.id, {
                              x: e.target.x(),
                              y: e.target.y()
                            });
                          }}
                          stroke={selectedElement === element.id ? '#3B82F6' : undefined}
                          strokeWidth={selectedElement === element.id ? 2 : 0}
                        />
                      );
                    }
                  }

                  return null;
                })}
            </Layer>
          </Stage>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && selectedElementData && (
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
            
            {selectedElementData.type === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
                  <textarea
                    value={selectedElementData.content || ''}
                    onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={selectedElementData.fontSize || 24}
                    onChange={(e) => updateElement(selectedElement, { fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{selectedElementData.fontSize}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                  <select
                    value={selectedElementData.fontFamily || 'Inter'}
                    onChange={(e) => updateElement(selectedElement, { fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-full h-10 rounded-lg border border-gray-300 flex items-center px-3 space-x-2"
                  style={{ backgroundColor: selectedElementData.fill }}
                >
                  <div 
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: selectedElementData.fill }}
                  ></div>
                  <span className="text-sm">{selectedElementData.fill}</span>
                </button>

                {showColorPicker && (
                  <div className="absolute top-12 left-0 z-10">
                    <div 
                      className="fixed inset-0" 
                      onClick={() => setShowColorPicker(false)}
                    ></div>
                    <SketchPicker
                      color={selectedElementData.fill}
                      onChange={(color) => updateElement(selectedElement, { fill: color.hex })}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">X Position</label>
                <input
                  type="number"
                  value={Math.round(selectedElementData.x)}
                  onChange={(e) => updateElement(selectedElement, { x: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Y Position</label>
                <input
                  type="number"
                  value={Math.round(selectedElementData.y)}
                  onChange={(e) => updateElement(selectedElement, { y: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {selectedElementData.type === 'shape' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                  <input
                    type="number"
                    value={Math.round(selectedElementData.width)}
                    onChange={(e) => updateElement(selectedElement, { width: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <input
                    type="number"
                    value={Math.round(selectedElementData.height)}
                    onChange={(e) => updateElement(selectedElement, { height: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasEditor;