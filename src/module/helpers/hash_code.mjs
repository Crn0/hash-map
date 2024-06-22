const Hash = (key, n) => {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i += 1) {
        hashCode = primeNumber * hashCode + (key.charCodeAt(i) % n);
    }

    return hashCode % n;
};

export default Hash;
