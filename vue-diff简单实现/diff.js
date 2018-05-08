// 构造函数, 用于生成一个dom
function Element(tagName, props, children) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children);
  }

  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : undefined;
  this.id = props ? props.id : undefined;
  this.node = '';
}

//json生成真实dom
function render(tree) {
  const el = document.createElement(tree.tagName);
  const props = tree.props;

  for (const propName in props) {
    el.setAttribute(propName, props[propName]);
  }

  tree.children.forEach(child => {
    const childEl =
      typeof child == 'object'
        ? render(child)
        : document.createTextNode(child);
    el.appendChild(childEl);
  });
  tree.node = el;
  return el;
  
};

// 比较入口函数
function diff(oldTree, newTree) {
  let record = [];
  if (!diffSame(oldTree, newTree)) {
    console.log(newTree.tagName + "节点替换");
    let obj = {
      type: '节点替换',
      oldTagName: oldTree.tagName,
      newTagName: newTree.tagName,
      content: '',
      oldNode: oldTree,
      newNode: newTree,
    }
    record.push(obj);
  } else {
    diffPatch(oldTree, newTree, record);
  }
  console.log(record);
  return record;
}

// 是否是相同节点, 属性不同也算不同阶段,重新生成, key,id,class等等属性
function diffSame(oldTree, newTree) {
  if (oldTree.tagName == newTree.tagName && oldTree.key == newTree.key) {
    for (key in oldTree.props) {
      if (oldTree.props[key] != newTree.props[key]) {
        console.log(oldTree.tagName + '属性不相同');
        return false;
      }
    }

    for (key in newTree.props) {
      if (oldTree.props[key] != newTree.props[key]) {
        console.log(oldTree.tagName + '属性不相同');
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}


// 比较是否是文本节点, 否则比较子节点
function diffPatch(oldTree, newTree, record) {
  if (typeof newTree.children[0] == "string") {
    console.log(newTree.tagName + "文本比较");
    if (newTree.children[0] !== oldTree.children[0]) {
      let obj = {
        type: '文本替换',
        tagName: oldTree.tagName,
        content: newTree.children[0],
        changeNode: oldTree,
        parentNode: oldTree
      }
      record.push(obj);
    }
  } else {
    diffChild(oldTree, oldTree.children, newTree.children, record);
  }
}

// 比较子节点
function diffChild(parentNode, oldNodeChild, newNodeChild, record) {
  let oldStartId = 0;
  let oldEndId = oldNodeChild.length - 1;
  let newStartId = 0;
  let newEndId = newNodeChild.length - 1;
  let oldStartNode = oldNodeChild[0];
  let oldEndNode = oldNodeChild[oldEndId];
  let newStartNode = newNodeChild[0];
  let newEndNode = newNodeChild[newEndId];

  let oldKeyToId
  let idxInOld
  let elmToMove
  let before

  while (oldStartId <= oldEndId && newStartId <= newEndId) {
    // 为null情况是, 有key的节点造成了移动,移动过的位置变成null,遇到null就往前移动, 不需要判断,肯定不回相同
    if (oldStartNode == null) {
        oldStartNode = oldNodeChild[++oldStartId];
    } else if (oldEndNode == null) {
        oldEndNode = oldNodeChild[--oldEndId];
    } else if (newStartNode == null) {
        newStartNode = newNodeChild[++newStartId];
    } else if (newEndNode == null) {
        newEndNode = newNodeChild[--newEndId];
    } else if (diffSame(oldStartNode, newStartNode)) {
      console.log("比较开始子节点");
      diffPatch(oldStartNode, newStartNode, record);
      oldStartNode = oldNodeChild[++oldStartId];
      newStartNode = newNodeChild[++newStartId];
    } else if (diffSame(oldEndNode, newEndNode)) {
      console.log("比较结尾子节点");
      diffPatch(oldEndNode, newEndNode, record);
      oldEndNode = oldNodeChild[--oldEndId];
      newEndNode = newNodeChild[--newEndId];
    } else if (diffSame(oldStartNode, newEndNode)) {
      console.log("比较开始-结尾子节点");
      diffPatch(oldStartNode, newEndNode, record);
      let obj = {
        type: '移动节点',
        from: oldStartNode.tagName,
        to: oldEndNode.tagName,
        direction: 'after',
        fromNode: oldStartNode,
        toNode: oldEndNode,
        parentNode: parentNode
      }
      record.push(obj);
      oldStartNode = oldNodeChild[++oldStartId];
      newEndNode = newNodeChild[--newEndId];
    } else if (diffSame(oldEndNode, newStartNode)) {
      console.log("比较结尾-开始子节点");
      let obj = {
        type: '移动节点',
        from: oldEndNode.tagName,
        to: oldStartNode.tagName,
        direction: 'before',
        fromNode: oldEndNode,
        toNode: oldStartNode,
        parentNode: parentNode
      }
      record.push(obj);
      diffPatch(oldEndNode, newStartNode, record);
      oldEndNode = oldNodeChild[--oldEndId];
      newStartNode = newNodeChild[++newStartId];
    } else {
      // 使用key时的比较
      if (oldKeyToId === undefined) {
          oldKeyToId = createKeyToOldIdx(oldNodeChild, oldStartId, oldEndId) // 有key生成index表
      }
      console.log(oldKeyToId);
      idxInOld = oldKeyToId[newStartNode.key]
      if (!idxInOld) {
        console.log('没有找到, 新建' + newStartNode.tagName);
        let obj = {
          type: '新增节点',
          add: newStartNode.tagName,
          to: oldStartNode.tagName,
          direction: 'before',
          addNode: newStartNode,
          toNode: oldStartNode,
          parentNode: parentNode
        }
        record.push(obj);
      }
      else {
        elmToMove = oldNodeChild[idxInOld];
        if (diffSame(elmToMove, newStartNode)) {
          diffPatch(elmToMove, newStartNode, record);
          oldNodeChild[idxInOld] = null;
          console.log('移动节点');
          let obj = {
            type: '移动节点',
            from: elmToMove.tagName,
            to: oldStartNode.tagName,
            direction: 'before',
            fromNode: elmToMove,
            toNode: oldStartNode,
            parentNode: parentNode
          };
          record.push(obj);
        } else {
          console.log('找到, 属性变化, 替换' + newStartNode.tagName);
          let obj = {
            type: '新增节点',
            add: newStartNode.tagName,
            to: oldStartNode.tagName,
            direction: 'before',
            addNode: newStartNode,
            toNode: oldStartNode,
            parentNode: parentNode
          }
          record.push(obj);
        }
      }
      newStartNode = newNodeChild[++newStartId];
    }
  }
  if (oldStartId > oldEndId && newStartId <= newEndId) {
    console.log('批量新增节点');
    let before = oldNodeChild[oldEndId + 1] == null ? null : oldNodeChild[oldEndId + 1]
    let obj = {
      type: '批量新增节点',
      add: newNodeChild,
      to: before ? before.tagName : '',
      direction: 'before',
      addNodeArray: newNodeChild,
      toNode: before,
      startId: newStartId,
      endId: newEndId,
      parentNode: parentNode
    }
    record.push(obj);
  } else if (newStartId > newEndId && oldStartId <= oldEndId) {
    console.log('批量删除节点');
    let obj = {
      type: '批量删除节点',
      deleteNodeArray: oldNodeChild,
      startId: oldStartId,
      endId: oldEndId,
      parentNode: parentNode
    }
    record.push(obj);
  }
}

// 取key存map
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (key != undefined) map[key] = i;
  }
  return map;
}

// 根据判断出来的变化,更新
function showChange(records, oldTree) {
  records.forEach(record => {
    // let parent = record.parentNode ? document.getElementById(record.parentNode.id) : '';
    let parent = record.parentNode ? record.parentNode.node : '';
    // console.log(parent);
    switch (record.type) {    
      case '节点替换': 
        // let newNode = record.newNode.render();
        let newNode = render(record.newNode);
        document.getElementById('virtualDom').replaceChild(newNode, record.oldNode.node);
        break;
      case '文本替换':
        // document.getElementById(record.newNode.id).textContent = record.content;
        record.changeNode.node.textContent = record.content;
        break;
      case '移动节点':
        if (record.direction == 'after') {
          // parent.insertBefore(document.getElementById(record.fromNode.id), document.getElementById(record.toNode.id).nextSibling);
          parent.insertBefore(record.fromNode.node, record.toNode.node);
        } else {
          // parent.insertBefore(document.getElementById(record.fromNode.id), document.getElementById(record.toNode.id));
          parent.insertBefore(record.fromNode.node, record.toNode.node);
        }
        break;
      case '新增节点':
        if (record.direction == 'after') {
          // parent.insertBefore(record.addNode.render(), record.toNode.node.nextSibling);
          parent.insertBefore(render(record.addNode), record.toNode.node.nextSibling);
        } else {
          // parent.insertBefore(record.addNode.render(), record.toNode.node);
          parent.insertBefore(render(record.addNode), record.toNode.node);
        }
        break;
      case '批量删除节点':
        for (let i = record.startId; i <= record.endId; i++) {
          if (record.deleteNodeArray[i]) {
            let delNode = record.deleteNodeArray[i].node;
            if (delNode) {
              parent.removeChild(delNode);
            }
          }
        }
        break;
      case '批量新增节点':
        
        for (let i = record.startId; i <= record.endId; i++) {
          if (record.toNode) {
            // parent.insertBefore(record.addNodeArray[i].render(), record.toNode.node);
            parent.insertBefore(render(record.addNodeArray[i]), record.toNode.node)
          } else {
            // parent.appendChild(record.addNodeArray[i].render());
            parent.appendChild(render(record.addNodeArray[i]));
          }
        }
        break;
      default:
        
    }
  });
}