const courses = [
    { id: 1, name: 'Product Management'},
    { id: 2, name: 'TOGAF 9.1'},
    { id: 3, name: 'Archimate 3.0'},
    { id: 4, name: 'Blockchain'},
    { id: 5, name: 'Kubernetes'}
]

const result = courses.find(c => courses.name == 'Kubernetes');
console.log(result);