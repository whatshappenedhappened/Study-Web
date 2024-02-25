function some(arr) {
    let leng = 0;

    for (let i = 0; arr[i] !== undefined; i++) {
        leng++;
    }

    return leng;
}


let arr1 = ['sport', 'baseball'];

// alert(arr1[2]);

alert(typeof(undefined));