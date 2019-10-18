class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() { 
    if (this.items.length == 0) 
      return "Empty"; 
    return this.items.pop(); 
  }

  peek() {
    return this.items[this.items.length - 1]; 
  }

  isEmpty() {
    return this.items.length == 0;
  }

  getSize() {
    return this.items.length;
  }

  swap() {
    if(this.items.length > 1) {
      let temp = this.items[this.items.length - 1];
      this.items[this.items.length - 1] = this.items[this.items.length - 2];
      this.items[this.items.length - 2] = temp;
    }
  }

  clear() {
    this.items = [];
  }
}

const stack = new Stack();
const items = document.querySelector('.stack-items');
const buttons = {
  clearStack: document.getElementById('clearStack'),
  push: document.getElementById('push'),
  pop: document.getElementById('pop'),
  peek: document.getElementById('peek'),
  size: document.getElementById('size'),
  isEmpty: document.getElementById('isEmpty'),
  swap: document.getElementById('swap')
};

// Event listeners
buttons.clearStack.onclick = () => {
  if(!stack.isEmpty()) {
    stack.clear();
  
    disableButtons(true);
    items.classList.add('stack-items--remove');
    setTimeout(() => {
      items.classList.remove('stack-items--remove');
      items.innerHTML = "";
      disableButtons(false);
    }, 500);
  }
}

buttons.push.onclick = () => {
  const itemName = "Item " + (stack.getSize() + 1);
  stack.push(itemName);

  disableButtons(true);
  // Create HTML element and push it to items
  const item = document.createElement('div');
  item.classList.add('stack-item');
  item.innerHTML = itemName;
  items.insertBefore(item, items.childNodes[0]);

  setTimeout(() => {
    disableButtons(false);
  },500)
}

buttons.pop.onclick = () => {
  if(!stack.isEmpty()) {
    stack.pop();

    disableButtons(true);
    items.childNodes[0].classList.add('popAnimation');
    setTimeout(() => {
      items.removeChild(items.childNodes[0]);
      disableButtons(false);
    }, 500);
  }
}

buttons.peek.onclick = () => {
  stack.peek();
}

buttons.size.onclick = () => {
  stack.size();
}

buttons.isEmpty.onclick = () => {
  stack.isEmpty();
}

buttons.swap.onclick = () => {
  let stackSize = stack.getSize();
  if(stackSize > 1) {
    stack.swap();
    
    disableButtons(true);
    items.childNodes[0].classList.add('moveDown');
    items.childNodes[1].classList.add('moveUp');
    setTimeout(() => {
      items.childNodes[0].classList.remove('moveDown');
      items.childNodes[1].classList.remove('moveUp');
      let temp = items.childNodes[0];
      items.insertBefore(items.childNodes[1], items.childNodes[0]);
      disableButtons(false);
    }, 500);
  }
}

// Functions
function disableButtons(value = true) {
  buttons.clearStack.disabled = value;
  buttons.push.disabled = value;
  buttons.pop.disabled = value;
  buttons.peek.disabled = value;
  buttons.size.disabled = value;
  buttons.isEmpty.disabled = value;
  buttons.swap.disabled = value;
}