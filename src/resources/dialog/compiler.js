import {DOM} from 'aurelia-pal';

export default function DialogCompiler(compiler, resources, element, instruction) {
  transformChildren(element, 'dialog');
  return true;
}

function transformChildren(parent, prefix, element) {
  let children = Array.from(parent.children);
  let child;
  let nodeName;
  let node;

  element = element || parent;

  while(child = children.shift()) {
    nodeName = child.localName;
    node   = DOM.createElement(`${prefix}-${nodeName}`);
    element.classList.add(`has-${nodeName}`);
    parent.insertBefore(node, child);
    node.appendChild(child);
  }
}
