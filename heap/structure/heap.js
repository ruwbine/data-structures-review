"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heap = void 0;
var Heap = /** @class */ (function () {
    /**
    @description compare function for creating max/min heap.
    *If you wanna make min heap -> (a,b) => (a-b). Max heap (a,b) => (b-a)
    */
    function Heap(compare) {
        this.heap = [];
        this.comparer = compare;
    }
    Heap.prototype.size = function () {
        return this.heap.length;
    };
    Heap.prototype.isEmpty = function () {
        return this.heap.length === 0;
    };
    Heap.prototype.insert = function (value) {
        this.heap.push(value);
        this.heapifyUp();
    };
    Heap.prototype.print = function () {
        console.log(this.heap);
    };
    Heap.prototype.peek = function () {
        return this.heap[0];
    };
    Heap.prototype.extract = function () {
        if (this.heap.length === 0)
            return undefined;
        if (this.heap.length === 1)
            return this.heap.pop();
        var root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    };
    Heap.prototype.heapifyUp = function () {
        var index = this.heap.length - 1;
        while (index < 0 &&
            this.comparer(this.heap[index], this.heap[this.getParentIndex(index)]) < 0) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    };
    Heap.prototype.heapifyDown = function () {
        var index = 0;
        while (this.hasLeftChild(index)) {
            var smallestChildIndex = this.leftChildIndex(index);
            // 1: If has right child and it's smaller than left
            if (this.hasRightChild(index) &&
                this.comparer(this.heap[this.rightChildIndex(index)], this.heap[this.leftChildIndex(index)])) {
                smallestChildIndex = this.rightChildIndex(index);
            }
            // 2: If parent's value less than child's value
            if (this.comparer(this.heap[index], this.heap[smallestChildIndex]) <= 0) {
                break;
            }
            // If all condition is true -> just swap
            this.swap(index, smallestChildIndex);
            index = smallestChildIndex;
        }
    };
    Heap.prototype.swap = function (i, j) {
        var _a;
        _a = [this.heap[j], this.heap[i]], this.heap[i] = _a[0], this.heap[j] = _a[1];
    };
    Heap.prototype.getParentIndex = function (index) {
        return Math.floor((index - 1) / 2);
    };
    Heap.prototype.leftChildIndex = function (parentIndex) {
        return 2 * parentIndex + 1;
    };
    Heap.prototype.rightChildIndex = function (parentIndex) {
        return 2 * parentIndex + 2;
    };
    Heap.prototype.hasLeftChild = function (index) {
        return this.leftChildIndex(index) < this.size();
    };
    Heap.prototype.hasRightChild = function (index) {
        return this.rightChildIndex(index) < this.size();
    };
    return Heap;
}());
exports.Heap = Heap;
