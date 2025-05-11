"use strict";
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Object.defineProperty(exports, "__esModule", { value: true });
var heap_1 = require("../heap/structure/heap");
var list_node_1 = require("./structure/list-node");
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
function arrayToList(arr) {
    var dummy = new list_node_1.ListNode(0);
    var current = dummy;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var num = arr_1[_i];
        current.next = new list_node_1.ListNode(num);
        current = current.next;
    }
    return dummy.next;
}
function listToArray(node) {
    var result = [];
    while (node) {
        result.push(node.val);
        node = node.next;
    }
    return result;
}
var lists = [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6],
];
function mergeKLists(lists) {
    var heap = new heap_1.Heap(function (a, b) { return a.val - b.val; });
    for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
        var node = lists_1[_i];
        if (node)
            heap.insert(node);
    }
    heap.print();
    var dummy = new list_node_1.ListNode(0);
    var current = dummy;
    while (!heap.isEmpty()) {
        var node = heap.extract();
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
var lists1 = [
    arrayToList([1, 4, 5]),
    arrayToList([1, 3, 4]),
    arrayToList([2, 6]),
];
console.log(listToArray(mergeKLists(lists1))); // Expected: [1,1,2,3,4,4,5,6]
// Test 2: Empty input
var lists2 = [];
console.log(listToArray(mergeKLists(lists2))); // Expected: []
// Test 3: All lists are null
var lists3 = [null, null, null];
console.log(listToArray(mergeKLists(lists3))); // Expected: []
// Test 4: Only one list
var lists4 = [arrayToList([2, 3, 7])];
console.log(listToArray(mergeKLists(lists4))); // Expected: [2, 3, 7]
// Test 5: Lists with duplicate elements
var lists5 = [
    arrayToList([1, 3, 5]),
    arrayToList([1, 3, 5]),
    arrayToList([1, 3, 5]),
];
console.log(listToArray(mergeKLists(lists5))); // Expected: [1,1,1,3,3,3,5,5,5]
