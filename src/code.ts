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
  const nodes: SceneNode[] = [];
  for (let i = 0; i < n; i++) {
    let node: SceneNode;
    switch (shape) {
      case "rectangle":
        node = figma.createRectangle();
        break;
      case "square":
        node = figma.createRectangle();
        node.resize(100, 100);
        break;
      case "circle":
        node = figma.createEllipse();
        node.resize(100, 100);
        break;
      case "hexagon":
        node = figma.createPolygon();
        node.pointCount = 6;
        node.resize(100, 100);
        break;
      case "triangle":
        node = figma.createPolygon();
        node.pointCount = 3;
        node.resize(100, 100);
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
