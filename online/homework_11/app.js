var rootNode = document.getElementById("root");
let doc = document;

const empty = "This folder is empty";
const materialIcon = "material-icons";
const folderIcon = 'folder';
const folderOpenIcon = 'folder_open';
const fileIcon = "insert_drive_file";

// Your code goes here

function createList(parentNode, className = ""){
  let ul = doc.createElement('ul');
  ul.className = className;
  parentNode.appendChild(ul);
  return ul;
}
function folderClick(e){
  if (e.target === this || e.target.parentElement === this){
    let container = this.nextSibling;
    let icon = this.childNodes[0];
    if(hasClass(container, 'open')){
      container.classList.remove('open');
      icon.innerHTML = folderIcon;
    } else {
      container.classList.add('open');
      icon.innerHTML = folderOpenIcon;
    }
  }
}
function fileClick(e){
  if (e.target === this || e.target.parentElement === this){
    //todo some action with file, like downlaod...
  }
}
/**
 * Create new list item
 * @parentNode - parent node
 * @className - class name
 * @text - inner text
 * @type - icon text (in this case we used material-icons set)
 * **/
function createItem(parentNode, className = "", text = "", type = ""){
  let li = doc.createElement('li');
  
  if (text.length > 0){
    let txtNode = doc.createTextNode(text);
    if (type.length > 0){
      createMaterialIcon(li, type);
      if (type === folderIcon){
        li.onclick = folderClick;
      } else if (type === fileIcon){
        li.onclick = fileClick;
      }
    }
    li.onmouseover = function(e){
      this.classList.add('hovered');
    }
    li.onmouseout = function(e){
      this.classList.remove('hovered');
    }
    li.appendChild(txtNode);
  }

  li.className = className;
  parentNode.appendChild(li);
  
  return li;
}
function createMaterialIcon(parentNode, iconText = ""){
    let icon = doc.createElement('i');
    icon.className = materialIcon;
    let txtNode = doc.createTextNode(iconText);
    icon.appendChild(txtNode);
    parentNode.appendChild(icon);
    return icon;
}
function hasClass(element, cls) {
  if (element === null) return false;
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * function to parse structure file. 
 * All new nodes will be connected to @param parentNode
 **/
function readNodes(structure, parentNode){
  for (let i = 0; i < structure.length; i++){
    if (structure[i]['folder'] === true){
      createItem(parentNode, "folder", structure[i]['title'], folderIcon);
      if (!structure[i]['children']){
        createItem(createList(parentNode, "list-container"), "empty", empty);
      }
    } else {
      createItem(parentNode, "file", structure[i]['title'], fileIcon);
    }
    if (structure[i]['children']){
      readNodes(structure[i]['children'], createList(createItem(parentNode, "list-container"), 'inner'));
    }
  }
}


//let rootList = createList(rootNode, 'basic');

//This is task required !!!
let list = doc.createElement('ul');
list.className = 'basic';
readNodes(structure, list);

rootNode.appendChild(list);