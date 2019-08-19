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
        this.items.shift()
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

export {
    Queue
}