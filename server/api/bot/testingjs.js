var payload = 'COURSE/GOALS/132456987'
const action = payload.slice(payload.indexOf('/') + 1, payload.lastIndexOf('/'));
const id = payload.slice(payload.lastIndexOf('/') + 1);


console.log(action);
console.log(id);