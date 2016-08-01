export function compileSwitch(compiler, resources, element, instruction) {
  let attr;
  let i = 0;

  element.switch = document.createElement('INPUT');
  element.switch.type = 'checkbox';

  while(attr = element.attributes.item(i++)) {
    // console.log(attr)
    element.switch.setAttribute(attr.nodeName, attr.nodeValue);
    element.removeAttribute(attr.nodeName);
  }

  element.appendChild(element.switch);
  return true;
}
