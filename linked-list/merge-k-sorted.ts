// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

import { Heap } from "../heap/structure/heap";
import { ListNode } from "./structure/list-node";

// Merge all the linked-lists into one sorted linked-list and return it.

// Example 1:

// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]

// merging them into one sorted list:
// 1->1->2->3->4->4->5->6

// Example 2:

// Input: lists = []
// Output: []

// Example 3:

// Input: lists = [[]]
// Output: []

// Constraints:

//     k == lists.length
//     0 <= k <= 104
//     0 <= lists[i].length <= 500
//     -104 <= lists[i][j] <= 104
//     lists[i] is sorted in ascending order.
//     The sum of lists[i].length will not exceed 104.

function arrayToList(arr: number[]): ListNode | null {
	let dummy = new ListNode(0);
	let current = dummy;
	for (let num of arr) {
		current.next = new ListNode(num);
		current = current.next;
	}
	return dummy.next;
}

function listToArray(node: ListNode | null): number[] {
	let result: number[] = [];
	while (node) {
		result.push(node.val);
		node = node.next;
	}
	return result;
}

const lists = [
	[1, 4, 5],
	[1, 3, 4],
	[2, 6],
];

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	const heap = new Heap<ListNode>((a, b) => a.val - b.val);

	for (const node of lists) {
		if (node) heap.insert(node);
	}
	heap.print();

	let dummy = new ListNode(0);
	let current = dummy;

	while (!heap.isEmpty()) {
		const node = heap.extract()!;
		current.next = node;
		current = current.next;
		heap.print();
		if (node.next) {
			heap.insert(node.next);
		}
		heap.print();
	}
	return dummy.next;
}

let lists1 = [
	arrayToList([1, 4, 5]),
	arrayToList([1, 3, 4]),
	arrayToList([2, 6]),
];
console.log(listToArray(mergeKLists(lists1))); // Expected: [1,1,2,3,4,4,5,6]

// Test 2: Empty input
let lists2: Array<ListNode | null> = [];
console.log(listToArray(mergeKLists(lists2))); // Expected: []

// Test 3: All lists are null
let lists3 = [null, null, null];
console.log(listToArray(mergeKLists(lists3))); // Expected: []

// Test 4: Only one list
let lists4 = [arrayToList([2, 3, 7])];
console.log(listToArray(mergeKLists(lists4))); // Expected: [2, 3, 7]

// Test 5: Lists with duplicate elements
let lists5 = [
	arrayToList([1, 3, 5]),
	arrayToList([1, 3, 5]),
	arrayToList([1, 3, 5]),
];
console.log(listToArray(mergeKLists(lists5))); // Expected: [1,1,1,3,3,3,5,5,5]
