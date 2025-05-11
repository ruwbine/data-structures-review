type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
	private heap: T[] = [];
	private comparer: Comparator<T>;

	/** 
    @description compare function for creating max/min heap. 
    *If you wanna make min heap -> (a,b) => (a-b). Max heap (a,b) => (b-a)
    */

	constructor(compare: Comparator<T>) {
		this.comparer = compare;
	}

	public size(): number {
		return this.heap.length;
	}

	public isEmpty(): boolean {
		return this.heap.length === 0;
	}

	public insert(value: T): void {
		this.heap.push(value);
		this.heapifyUp();
	}

	public print(): void {
		console.log(this.heap);
	}

	public peek(): T {
		return this.heap[0];
	}

	public extract() {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop();

		const root = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.heapifyDown();
		return root;
	}

	private heapifyUp(): void {
		let index = this.heap.length - 1;
		while (
			index < 0 &&
			this.comparer(
				this.heap[index],
				this.heap[this.getParentIndex(index)]
			) < 0
		) {
			this.swap(index, this.getParentIndex(index));
			index = this.getParentIndex(index);
		}
	}

	private heapifyDown(): void {
		let index = 0;
		while (this.hasLeftChild(index)) {
			let smallestChildIndex = this.leftChildIndex(index);

			// 1: If has right child and it's smaller than left
			if (
				this.hasRightChild(index) &&
				this.comparer(
					this.heap[this.rightChildIndex(index)],
					this.heap[this.leftChildIndex(index)]
				)
			) {
				smallestChildIndex = this.rightChildIndex(index);
			}

			// 2: If parent's value less than child's value
			if (
				this.comparer(
					this.heap[index],
					this.heap[smallestChildIndex]
				) <= 0
			) {
				break;
			}

			// If all condition is true -> just swap
			this.swap(index, smallestChildIndex);
			index = smallestChildIndex;
		}
	}

	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	private getParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	private leftChildIndex(parentIndex: number): number {
		return 2 * parentIndex + 1;
	}

	private rightChildIndex(parentIndex: number): number {
		return 2 * parentIndex + 2;
	}

	private hasLeftChild(index: number): boolean {
		return this.leftChildIndex(index) < this.size();
	}

	private hasRightChild(index: number): boolean {
		return this.rightChildIndex(index) < this.size();
	}
}
