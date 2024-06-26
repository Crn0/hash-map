const resize = (buckets, CAPACITY) => {
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
