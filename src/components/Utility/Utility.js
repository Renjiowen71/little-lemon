export const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

export const fetchAPI = function(date) {
    const validDate = new Date(date);
    if (isNaN(validDate)) {
        throw new Error("Invalid date provided");
    }
    let result = [];
    let random = seededRandom(validDate.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

export const submitAPI = function(formData) {
    return true;
};