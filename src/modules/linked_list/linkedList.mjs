import Node from './node.mjs';
import assert from 'node:assert';

class LinkedList {
    constructor() {
        this.root = new Node();
    }

    append(key, value) {
        let node = this.root;
        if (node.key === null) {
            node.key = key;
            node.value = value;
            return node;
        }

        while (node.next !== null) {
            node = node.next;
        }

        node.next = new Node(key, value);
    }

    has(key) {
        let node = this.root;

        while (node) {
            if (node.key === key) return true;

            node = node.next;
        }

        return false;
    }

    updateValue(key, value) {
        let node = this.root;

        while (node) {
            if (node.key === key) break;

            node = node.next;
        }

        node.value = value;

        return node;
    }

    get(key) {
        let node = this.root;

        while (node) {
            if (node.key === key) {
                const { key, value } = node;

                return {
                    key,
                    value,
                };
            }

            node = node.next;
        }

        return null;
    }

    removeNode(key) {
        let node = this.root;
        let prev = node;

        if (node.key === key) {
            this.root = node.next;

            return;
        }

        while (node.next) {
            if (node.key === key) {
                break;
            }

            prev = node;
            node = node.next;
        }

        prev.next = node.next;
    }

    keys() {
        let temp = this.root;
        const array = [];

        while (temp) {
            if (temp.key) {
                array.push(temp.key);
            }

            temp = temp.next;
        }

        return array;
    }

    values() {
        let temp = this.root;
        const array = [];

        while (temp) {
            if (temp.value) {
                array.push(temp.value);
            }

            temp = temp.next;
        }

        return array;
    }

    entries() {
        let temp = this.root;
        const array = [];

        while (temp) {
            if (temp.value && temp.key) {
                array.push([temp.key, temp.value]);
            }

            temp = temp.next;
        }

        return array;
    }
}

export default LinkedList;
