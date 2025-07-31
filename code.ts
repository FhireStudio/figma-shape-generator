figma.showUI(__html__, { themeColors: true });

type ShapeType = "rectangle" | "square" | "circle" | "hexagon" | "triangle";

// Listen for a message with shape type and count
figma.ui.onmessage = (msg: {
  count: number;
  shape: ShapeType;
  color: { r: number; g: number; b: number };
}) => {
  console.log("Received from UI", msg);
  createShapes(msg.count, msg.shape, msg.color);
  figma.closePlugin();
};

function createShapes(
  n: number = 1,
  shape: ShapeType = "rectangle",
  color: { r: number; g: number; b: number }
) {
  console.log("Creating shapes");
  const nodes: SceneNode[] = [];
  for (let i = 0; i < n; i++) {
    let node: SceneNode;
    switch (shape) {
      case "rectangle":
        node = figma.createRectangle();
        break;
      case "square":
        node = figma.createRectangle();
        (node as RectangleNode).resize(100, 100);
        break;
      case "circle":
        node = figma.createEllipse();
        (node as EllipseNode).resize(100, 100);
        break;
      case "hexagon":
        node = figma.createPolygon();
        (node as PolygonNode).pointCount = 6;
        (node as PolygonNode).resize(100, 100);
        break;
      case "triangle":
        node = figma.createPolygon();
        (node as PolygonNode).pointCount = 3;
        (node as PolygonNode).resize(100, 100);
        break;
      default:
        node = figma.createRectangle();
    }
    node.x = i * 150;
    node.fills = [{ type: "SOLID", color }];
    figma.currentPage.appendChild(node);
    nodes.push(node);
  }
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}
