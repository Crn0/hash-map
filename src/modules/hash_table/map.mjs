import assert from 'node:assert';
import LinkedList from '../linked_list/linkedList.mjs';
import {
    INITIAL_CAPACITY,
    LOAD_FACTOR,
} from '../constants/hashTableConstants.mjs';

class HashMap {
    #size = 0;
    #loadFactor = LOAD_FACTOR;
    #CAPACITY = INITIAL_CAPACITY;
    #buckets = Array.from({ length: this.#CAPACITY }, () => new LinkedList());
    constructor() {}

    set(key, value) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket.has(key)) {
            bucket.updateValue(key, value);

            return this.entries();
        }

        bucket.append(key, value);
        this.#size += 1;

        if (this.#loadFactorReached()) {
            this.#resize();
        }

        return this.entries();
    }

    get(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        return bucket.get(key);
    }

    has(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket.has(key)) return true;

        return false;
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

    values() {
        const v = this.#buckets.map((n) => n.values());

        return v.reduce((arr, values) => {
            if (values.length) {
                values.map((v) => arr?.push(v));

                return arr;
            }

            return arr;
        }, []);
    }

    entries() {
        return this.#buckets.map((n) => n.entries()).flat();
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
        const oldBuckets = [...this.entries()];

        this.clear();

        this.#CAPACITY = this.#CAPACITY * 2;
        this.#buckets = Array.from(
            { length: this.#CAPACITY },
            () => new LinkedList()
        );

        oldBuckets.map((v) => this.set(v[0], v[1]));
    }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

assert.deepEqual(
    test.get('lion'),
    { key: 'lion', value: 'golden' },
    'Node values are not equal after setting it'
);

for (const entry of test.set('lion', 'black')) {
    if (entry.includes('lion')) {
        assert.notDeepEqual(
            entry[1],
            'golden',
            'Node retained its previous value'
        );
    }
}

for (const entry of test.set('kite', 'orange')) {
    if (entry.includes('kite')) {
        assert.notDeepEqual(
            entry[1],
            'pink',
            'Node retained its previous value'
        );
    }
}

assert.notDeepEqual(
    test.entries().length,
    0,
    'There is no entries in the hashmap'
);

assert.deepEqual(test.set('moon', 'silver').length, 13, 'Node did not get set');

assert.deepEqual(test.length(), 13, 'Test actual length of the hashmap');

assert.deepEqual(test.keys().length, 13, 'There is no keys in the hashmap');

assert.deepEqual(test.values().length, 13, 'There is no values in the hashmap');

test.clear();

assert.deepEqual(test.length(), 0, 'There are still values in the HashMap');

