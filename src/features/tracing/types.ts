export interface TracingNode {
  x: number;
  y: number;
  icon: string;
}

export interface PathDef {
  id: string;
  color: string;
  d: string; // Cubic Bezier or any SVG path data
  startNode: TracingNode;
  endNode: TracingNode;
  label: string; // Cantonese Animal Name (e.g., '貓')
}
