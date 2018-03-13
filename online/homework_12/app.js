let doc = document;
let rootNode = doc.getElementById('root');

function tank(tankInfo){
  let Tank = {};
  Tank.info = [];
  Tank.thumbnailNode;
  Tank.detailsNode;
  for (let property in tankInfo) {
    if (tankInfo.hasOwnProperty(property)) {
      Tank.info[property] = tankInfo[property];
    }
  }
  let createHash = function(hash){
    let reg = new RegExp(" ","g");
    Tank.info['hash'] = hash.replace(reg, "-").toLowerCase();
  }
  let getDetailsName = function(option){
    let reg = new RegExp("_","g");
    return option.replace(reg, " ");
  }
  let details = function(e){
    e.preventDefault();
    location.hash = Tank.info['hash'];
  }
  let renderFlag = function(){
    let flag = doc.createElement('img');
    flag.src = Tank.info['country_image'];
    flag.alt = flag.title = Tank.info['country'];
    return flag;
  }
  let renderImage = function(){
    let image = doc.createElement('img');
    image.src = Tank.info['preview'];
    image.alt = image.title = Tank.info['model'];
    return image;
  }
  let renderDetailsTitle = function(){
    let title = doc.createElement('div');
    title.className = "title-details";
    
    let flag = renderFlag();
    
    let titleH1 = doc.createElement('h1');
    let textH1 = doc.createTextNode(Tank.info['model']); 
    let level = doc.createElement('span');
    level.className = "details-level";
    level.textContent = "(level " + Tank.info['level'].toString() + ")";
    
    titleH1.appendChild(textH1);
    titleH1.appendChild(level);
    title.appendChild(flag);
    title.appendChild(titleH1);
    
    return title;
  }
  let renderOption = function(key, value){
    let row = doc.createElement('div');
    row.className = "row";
    let left = doc.createElement('span');
    left.textContent = getDetailsName(key);
    let right = doc.createElement('span');
    right.textContent = value;
    row.appendChild(left);
    row.appendChild(right);
    return row;
  }
  createHash(Tank.info['model']);
  let renderLeftView = function(){
    let view = doc.createElement('div');
    view.className = "view left-view";
    let title = doc.createElement('p');
    title.textContent = "Preview"
    let image = renderImage();
    
    view.appendChild(title);
    view.appendChild(image);
    return view;
  }
  let renderRightView = function(){
    let view = doc.createElement('div');
    view.className = "view right-view";
    let title = doc.createElement('p');
    title.textContent = "Characteristic";
    
    let optionContainer = doc.createElement('div');
    optionContainer.className = "option-container";
    
    for (let prop in Tank.info['details']){
      optionContainer.appendChild(renderOption(prop, Tank.info['details'][prop]));
    }
    
    view.appendChild(title);
    view.appendChild(optionContainer);
    return view
  }
  Tank.renderDetails = function(){
    if (Tank.detailsNode === undefined){
      Tank.detailsNode = doc.createElement('div');
      Tank.detailsNode.className = "layout-details";
      
      Tank.detailsNode.appendChild(renderDetailsTitle());
      
      let layout = doc.createElement('div');
      layout.className = "tank-layout";

      layout.appendChild(renderLeftView());
      layout.appendChild(renderRightView());
      Tank.detailsNode.appendChild(layout);
    }
    return Tank.detailsNode;
  }
  Tank.getHash = function(){
    return Tank.info['hash'];
  }
  Tank.renderThumbnail = function(){
    if (Tank.thumbnailNode === undefined){
      Tank.thumbnailNode = doc.createElement('a');
      Tank.thumbnailNode.href = "#";
      Tank.thumbnailNode.className = "thumb-tank";
      Tank.thumbnailNode.onclick = details;
      
      let title = doc.createElement('div');
      title.className = "thumb-tank-title";
      
      let level = doc.createElement('span');
      let model = doc.createTextNode(Tank.info['model']);
      level.textContent = Tank.info['level'];
      level.className = "text-light";
      
      title.appendChild(renderFlag());
      title.appendChild(level);
      title.appendChild(model);
      Tank.thumbnailNode.appendChild(renderImage());
      Tank.thumbnailNode.appendChild(title);
    }
    return Tank.thumbnailNode;
  }
  
  return Tank;
}
function app(root, tanksArray){
  let App = {};
  App.tanks = [];
  App.root = root;
  for (let i = 0; i < tanksArray.length; i++){
    App.tanks[i] = tank(tanksArray[i]);
  }
  let renderBackLink = function(){
    let backLink = doc.createElement('a');
    backLink.className = "back-link";
    backLink.href = "#";
    backLink.textContent = "Back to list view";
    backLink.onclick = function(e){
      e.preventDefault();
      location.hash = "";
    }
    return backLink;
  }
  App.hashChange = function(event){
    let currentHash = location.hash;
    App.clearPage();
    if (currentHash === ""){
      App.renderList();
    } else {
      let tank = App.findTankByHash(currentHash.substr(1));
      if (tank !== false){
        App.renderTank(tank);
      } else {
        App.renderNotFound();
      }
    }
  }
  App.findTankByHash = function(hash){
    for (let tank of App.tanks){
      if (tank.getHash() === hash){
        return tank;
      }
    }
    return false;
  }
  App.renderList = function(){
    let thumbnails = doc.createElement('div');
    thumbnails.className = "thumbnails";
    for (let tank of App.tanks) {
      thumbnails.appendChild(tank.renderThumbnail());
    }
    App.root.appendChild(thumbnails);
  }
  App.renderTank = function(tank){
    App.root.appendChild(tank.renderDetails());
    App.root.appendChild(renderBackLink());
  }
  App.renderNotFound = function(){
    let error = doc.createElement('p');
    error.className = "error";
    error.textContent = "Page not found! Press link below to show full list..."
    App.root.appendChild(error);
    App.root.appendChild(renderBackLink());
  }
  App.clearPage = function (){
    while (App.root.firstChild) {
      App.root.removeChild(App.root.firstChild);
    }
  }
  App.run = function(){
    window.addEventListener("hashchange",App.hashChange);
    window.addEventListener("load",App.hashChange);
  }
  return App;
}

let App = app(rootNode, tanks);
App.run();




