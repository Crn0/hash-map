import LinkedList from '../linked_list/linked_list.mjs';
import { assert } from 'node:console'
const INITIAL_CAPACITY = 16;
const LOAD_FACTOR = 0.75;

function HashMap() {
    let buckets = Array(INITIAL_CAPACITY);
    let CAPACITY = INITIAL_CAPACITY;
    const loadFactor = LOAD_FACTOR;

    const hash = (key) => {
        try {
            const primeNumber = 31;
            let hashCode = 0;

            assert(typeof key === 'string', `receive typeof ${typeof key}: expected typeof string`)

            if (key < 0 || key >= buckets.length) {
                throw new Error('Trying to access index out of bound');
            }

            if (typeof key !== 'string') {
                throw new Error(
                    `receive typeof ${typeof key}: expected typeof string`
                );
            }

            for (let i = 0; i < key.length; i += 1) {
                hashCode =
                    primeNumber * hashCode + (key.charCodeAt(i) % CAPACITY);
            }

            return hashCode % CAPACITY;
        } catch (error) {
            console.error(error);
        }
    };

    const set = (key, value) => {
        const hashCode = hash(key);
        const node = LinkedList(key, value);

        if (buckets[hashCode] !== undefined) {
            if (has(key)) {
                let tempNode = buckets[hashCode];
                while (tempNode) {
                    if (tempNode.key === key) {
                        tempNode.value = value;

                        return {
                            key: node.key,
                            value: node.value,
                        };
                    }

                    tempNode = tempNode.next;
                }
            } else {
                let tempNode = buckets[hashCode];
                while (tempNode.next) {
                    tempNode = tempNode.next;
                }

                tempNode.next = node;

                if (loadFactorReached()) {
                    resize();

                    return;
                }

                return {
                    key: node.key,
                    value: node.value,
                };
            }
        }

        buckets[hashCode] = node;

        if (loadFactorReached()) {
            resize();

            return;
        }

        return {
            key: node.key,
            value: node.value,
        };
    };

    const loadFactorReached = () => {
        return length() / CAPACITY > loadFactor;
    };

    const resize = () => {
        const oldBuckets = structuredClone(buckets);

        clear();

        CAPACITY = CAPACITY * 2;

        buckets = Array(CAPACITY);

        oldBuckets.map((node) => {
            let tempNode = node;

            while (tempNode) {
                set(tempNode.key, tempNode.value);

                tempNode = tempNode.next;
            }
        });
    };

    const get = (key) => {
        const hashCode = hash(key);
        let node = buckets[hashCode];

        while (node) {
            if (node.key === key) {
                const { key, value } = node;

                return value;
            }

            node = node.next;
        }

        return null;
    };

    const has = (key) => {
        const hashCode = hash(key);
        let node = buckets[hashCode];

        while (node) {
            if (node.key === key) return true;

            node = node.next;
        }

        return false;
    };

    const remove = (key) => {
        const hashCode = hash(key);
        let node = buckets[hashCode];

        if (has(key)) {
            let tempNode = node;
            let prevNode = tempNode;
            while (tempNode.next) {
                if (tempNode.key === key) {
                    break;
                }
                prevNode = tempNode;
                tempNode = tempNode.next;
            }

            prevNode.next = tempNode.next;
            return true;
        }

        return false;
    };

    const length = () => {
        const queue = structuredClone(buckets);
        let count = 0;

        while (queue.length !== 0) {
            const current = queue.shift();
            let node = current;

            if (node) {
                while (node) {
                    count += 1;
                    node = node.next;
                }
            }
        }

        return count;
    };

    const clear = () => (buckets.length = 0);

    const keys = () => {
        let array = [];
        const queue = structuredClone(buckets);

        while (queue.length !== 0) {
            const current = queue.shift();
            let node = current;

            if (node) {
                while (node) {
                    array = [...array, node.key];
                    node = node.next;
                }
            }
        }

        return array;
    };

    const values = () => {
        let array = [];
        const queue = structuredClone(buckets);

        while (queue.length !== 0) {
            const current = queue.shift();
            let node = current;

            if (node) {
                while (node) {
                    array = [...array, node.value];
                    node = node.next;
                }
            }
        }

        return array;
    };

    const entries = () => {
        let array = [];
        const queue = structuredClone(buckets);

        while (queue.length !== 0) {
            const current = queue.shift();
            let node = current;

            if (node) {
                while (node) {
                    array = [...array, [node.key, node.value]];
                    node = node.next;
                }
            }
        }

        return array;
    };

    return Object.freeze({
        get buckets() {
            return buckets;
        },
        hash,
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    });
}

export default HashMap;
