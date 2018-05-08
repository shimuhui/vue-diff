
const tree = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('p', {}, ['p标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '3', class: 'item'}, ['li标签3']),
    Element('li', { key: '4', class: 'item'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '6', class: 'item'}, ['li标签6']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const tree1 = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签文本替换']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('p', {}, ['p标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '3', class: 'item'}, ['li标签3']),
    Element('li', { key: '4', class: 'item'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '6', class: 'item'}, ['li标签6']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const tree2 = Element('p', { id: 'virtual-container' }, ['我是p标签了']);

const tree3 = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签']),
  Element('h4', {}, ['h4标签']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('p', {}, ['p标签']),
  Element('h5', {}, ['h5标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '3', class: 'item'}, ['li标签3']),
    Element('li', { key: '4', class: 'item'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '6', class: 'item'}, ['li标签6']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const tree4 = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '3', class: 'item'}, ['li标签3']),
    Element('li', { key: '4', class: 'item'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '6', class: 'item'}, ['li标签6']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const tree5 = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('p', {}, ['p标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '4', class: 'item2'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '9', class: 'item'}, ['li标签9']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const tree6 = Element('div', { id: 'virtual-container' }, [
  Element('h1', {}, ['h1标签文本替换']),
  Element('h4', {}, ['h4标签']),
  Element('h2', {}, ['h2标签']),
  Element('h3', {}, ['h3标签']),
  Element('h5', {}, ['h5标签']),
  Element('ul', {}, [
    Element('li', { key: '1', class: 'item'}, ['li标签1']),
    Element('li', { key: '7', class: 'item'}, ['li标签7']),
    Element('li', { key: '4', class: 'item2'}, ['li标签4']),
    Element('li', { key: '5', class: 'item'}, ['li标签5']),
    Element('li', { key: '9', class: 'item'}, ['li标签9']),
    Element('li', { key: '2', class: 'item'}, ['li标签2']),
    Element('li', { key: '8', class: 'item'}, ['li标签8']),
  ]),
]);

const rootOld = render(JSON.parse(JSON.stringify(tree)));
document.getElementById('virtualDomOld').appendChild(rootOld);

document.getElementById('demo1').addEventListener('click', function () {
  startDiff(tree1);
})

document.getElementById('demo2').addEventListener('click', function () {
  startDiff(tree2);
})

document.getElementById('demo3').addEventListener('click', function () {
 
  startDiff(tree3);
})

document.getElementById('demo4').addEventListener('click', function () {
  startDiff(tree4);
})

document.getElementById('demo5').addEventListener('click', function () {
  startDiff(tree5);
})

document.getElementById('demo6').addEventListener('click', function () {
  startDiff(tree6);
})

function startDiff(newTree) {
  var f = document.getElementById("virtualDom"); 
  var childs = f.childNodes; 
  for(var i = childs.length - 1; i >= 0; i--) { 
    f.removeChild(childs[i]); 
  }
  let oldTree = JSON.parse(JSON.stringify(tree));
  let root = render(oldTree);
  document.getElementById('virtualDom').appendChild(root);
  console.log(oldTree);
  console.log(JSON.parse(JSON.stringify(newTree)));
  let records = diff(oldTree, JSON.parse(JSON.stringify(newTree)));
  showChange(records);
  console.log(document.getElementById('virtualDomOld'));
  console.log(document.getElementById('virtualDom'));
}
