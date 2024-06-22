import HashMap from '../src/module/hash_table/map.mjs';

const table = HashMap();
const klein = {
    key: 'Klein',
    value: 'The Fool',
};
const klein2 = {
    key: 'Klein2',
    value: 'Seer',
    next: null,
};
const hashCode1 = table.hash(klein.key);
const hashCode2 = table.hash(klein2.key);

afterEach(() => {
    table.clear();
});

describe('Test hashmap', () => {
    test('Set an key and value', () => {
        expect(table.set('Klein', 'The Fool')).toEqual(klein);
    });

    test('If an key exist update its value', () => {
        table.set(klein.key, klein.value);

        expect(table.set('Klein', 'Moretti')).not.toEqual(klein);
    });

    test('Deals with collision', () => {
        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);

        expect(table.buckets[hashCode1]).toEqual(table.buckets[hashCode2]);
        expect(table.buckets[hashCode1].key).toBe(klein.key);
        expect(table.buckets[hashCode1].value).toBe(klein.value);
        expect(table.buckets[hashCode1].next).toEqual(klein2);
        expect(table.buckets[hashCode2].next.key).toBe(klein2.key);
        expect(table.buckets[hashCode2].next.value).toBe(klein2.value);
        expect(table.buckets[hashCode2].next.next).toBe(null);
    });

    test('Grow the capacity if the buckets reach the load factor', () => {
        const array = Array(11).fill(true);
        array.map((v, i) => {
            table.set(`key${i}`, v);
        });

        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);

        expect(table.capacity).not.toEqual(16);
    });

    test('Get an key and return the value of the key; if no key is found return null', () => {
        table.set(klein.key, klein.value);

        expect(table.get(klein.key)).toBe(klein.value);
        expect(table.get('Audrey')).toBeNull();
    });

    test('Check if an key exist in the hash map', () => {
        table.set(klein.key, klein.value);

        expect(table.has(klein.key)).toBeTruthy();
        expect(table.has('Audrey')).toBeFalsy();
    });

    test('Remove an key in the hashmap', () => {
        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);
        table.set('KLein', 'Clown');
        table.set('KLEin', 'Faceless');

        const arrayValues = [klein.key, 'KLein', 'KLEin'];

        // return true if an key exist
        expect(table.remove(klein2.key)).toBeTruthy();
        // return false if an key does not exist
        expect(table.remove(klein2.key)).not.toBeTruthy();
        // check for all keys that is not deleted
        for (const key of arrayValues) {
            expect(table.has(key)).toBeTruthy();
        }
    });

    test('Returns the number of stored keys in the hashmap', () => {
        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);
        table.set('KLein', 'Clown');
        table.set('KLEin', 'Faceless');

        expect(table.length()).toEqual(4);
    });

    test('Returns an array containing all the keys inside the hash map', () => {
        const keys = ['Audrey', klein.key, klein2.key, 'KLein', 'KLEin'];

        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);
        table.set('KLein', 'Clown');
        table.set('KLEin', 'Faceless');
        table.set('Audrey', 'Justice');

        for (const key of table.keys()) {
            expect(keys.includes(key)).toBeTruthy();
        }
    });

    test('Returns an array containing all the values inside the hash map', () => {
        const values = [
            klein.value,
            klein2.value,
            'Clown',
            'Faceless',
            'Justice',
        ];

        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);
        table.set('KLein', 'Clown');
        table.set('KLEin', 'Faceless');
        table.set('Audrey', 'Justice');

        for (const value of table.values()) {
            expect(values.includes(value)).toBeTruthy();
        }

        expect(Array.isArray(table.values())).toBeTruthy();
    });

    test('Returns an array containing all the key and value inside the hash map', () => {
        const values = [
            klein.key,
            klein2.key,
            'Audrey',
            'KLein',
            'KLEin',
            klein.value,
            klein2.value,
            'Clown',
            'Faceless',
            'Justice',
        ];

        table.set(klein.key, klein.value);
        table.set(klein2.key, klein2.value);
        table.set('KLein', 'Clown');
        table.set('KLEin', 'Faceless');
        table.set('Audrey', 'Justice');

        for (const value of table.entries().flat()) {
            expect(values.includes(value)).toBeTruthy();
        }

        expect(Array.isArray(table.entries())).toBeTruthy();
    });
});
