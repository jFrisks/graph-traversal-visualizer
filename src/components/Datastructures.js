class Queue 
{ 
    // Array is used to implement a Queue 
    constructor() 
    { 
        this.items = []; 
    } 
                  
    enqueue(item) {
        this.items.push(item)
    }
    dequeue() {
        if(this.isEmpty())
            return "Trying to dequeue empty queue"
        return this.items.shift()
    }
    peek() {
        if(this.isEmpty())
            return "Trying to peek empty queue"
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    // printQueue() 
} 

class Stack 
{ 
    // Array is used to implement a Queue 
    constructor() 
    { 
        this.items = []; 
    } 
                  
    push(item) {
        this.items.push(item)
    }
    pop() {
        if(this.isEmpty())
            return "Trying to dequeue empty queue"
        return this.items.pop()
    }
    peek() {
        if(this.isEmpty())
            return "Trying to peek empty queue"
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    // printQueue() 
} 

export {
    Queue,
    Stack
}