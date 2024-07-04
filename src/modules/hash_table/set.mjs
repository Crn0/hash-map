import assert from 'node:assert';
import Node from '../linked_list/node.mjs';
import LinkedList from '../linked_list/linkedList.mjs';
import {
    INITIAL_CAPACITY,
    LOAD_FACTOR,
} from '../constants/hashTableConstants.mjs';

class N extends Node {
    constructor(key = null, next = null) {
        super();
        this.key = key;
        this.next = next;
    }
}

class LL extends LinkedList {
    constructor() {
        super();
        this.root = new N();
    }

    append(key) {
        let node = this.root;

        if (node.key === null) {
            node.key = key;

            return;
        }

        while (node.next !== null) {
            node = node.next;
        }

        node.next = new N(key);
    }

    get(key) {
        let node = this.root;

        while (node) {
            if (node.key === key) {
                return node.key;
            }

            node = node.next;
        }

        return null;
    }

    has(key) {
        return super.has(key);
    }

    updateKey(key) {
        let node = this.root;

        while (node) {
            if (node.key === key) break;

            node = node.next;
        }

        node.key = key;
    }

    removeNode(key) {
        return super.removeNode(key);
    }

    keys() {
        return super.keys();
    }
}

class HashSet {
    #size = 0;
    #loadFactor = LOAD_FACTOR;
    #CAPACITY = INITIAL_CAPACITY;
    #buckets = Array.from({ length: this.#CAPACITY }, () => new LL());

    set(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket.has(key)) {
            bucket.updateKey(key);
            return bucket.keys();
        }

        bucket.append(key);
        this.#size += 1;

        if (this.#loadFactorReached()) {
            this.#resize();
        }

        return bucket.keys();
    }

    get(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];
        return bucket.get(key);
    }

    has(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        return bucket.has(key);
    }

    remove(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (!bucket.has(key)) return false;

        bucket.removeNode(key);
        this.#size -= 1;

        return true;
    }

    length() {
        return this.#size;
    }

    clear() {
        this.#buckets.length = 0;
        this.#size = 0;
    }

    keys() {
        const k = this.#buckets.map((n) => n.keys());

        return k.reduce((arr, keys) => {
            if (keys.length) {
                keys.map((v) => arr?.push(v));

                return arr;
            }

            return arr;
        }, []);
    }

    #hash(key) {
        try {
            let hashCode = 0;
            const primeNumber = 31;

            for (let i = 0; i < key.length; i++) {
                hashCode =
                    (primeNumber * hashCode + key.charCodeAt(i)) %
                    this.#CAPACITY;
            }

            if (hashCode < 0 || hashCode >= this.#buckets.length) {
                throw new Error('Trying to access index out of bound');
            }

            return hashCode;
        } catch (error) {
            console.error(error);
        }
    }

    #loadFactorReached() {
        return this.length() / this.#CAPACITY > this.#loadFactor;
    }

    #resize() {
        const oldBuckets = [...this.keys()];

        this.clear();

        this.#CAPACITY = this.#CAPACITY * 2;
        this.#buckets = Array.from({ length: this.#CAPACITY }, () => new LL());

        oldBuckets.map((v) => this.set(v));
    }
}

const test = new HashSet();
test.set('foo');
test.set('bar');
test.set('baz');
test.set('jazz');
test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');

assert.deepEqual(test.has('foo'), true, 'there is no such key');
assert.deepEqual(test.has('fo'), false, 'key is available');
// TEST REMOVE KEYS
test.remove('foo');
assert.deepEqual(test.has('foo'), false, 'key is available');
// test GET()
assert.deepEqual(test.get('lion'), 'lion', 'there is no such key');
// TEST KEYS()
assert.deepEqual(Array.isArray(test.keys()), true, 'is not an array');
assert.notDeepEqual(test.keys().length, 0, 'array is empty');
// CLEAR HASH SET
test.clear();

assert(test.keys().length === 0, 'There is still values');
