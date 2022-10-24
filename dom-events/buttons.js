function handleClick(event) {
  console.log('button clicked');
  console.log('event:', event);
  console.log('event.target:', event.target);
}

var $buttonClicked = document.querySelector('.click-button');
$buttonClicked.addEventListener('click', handleClick);

function handleMouseover(event) {
  console.log('button hovered');
  console.log('event:', event);
  console.log('event.target:', event.target);
}

var $buttonHovered = document.querySelector('.hover-button');
$buttonHovered.addEventListener('mouseover', handleMouseover);

function handleDoubleClick(event) {
  console.log('button double clicked');
  console.log('event:', event);
  console.log('event.target:', event.target);
}

var $buttonDoubleClicked = document.querySelector('.double-click-button');
$buttonDoubleClicked.addEventListener('dblclick', handleDoubleClick);
