// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

//JSON
const jsonString = `{
    "list": [
        {
        "name": "Petr",
        "age": "20",
        "prof": "mechanic"
        },
        {
        "name": "Vova",
        "age": "60",
        "prof": "pilot"
        }
    ]
}`
   
//Получение данных
const data = JSON.parse(jsonString);
const listNode = data.list;
   
//Запись данных в результирующий объект
let people = [];
let result = {
    list: people
};
   
listNode.forEach(element => {  
    let man = {
    name: element.name,
    age: Number(element.age),
    prof: element.prof
    };
    
    people.push(man);
});
   
console.log(result);