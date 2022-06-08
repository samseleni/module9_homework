// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

//XML
const xmlString =`
    <list>
    <student>
        <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>`

//Создание экземляра класса DOMParser
const parser = new DOMParser;

//Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

//Получение родительских DOM-нод
const listNode = xmlDOM.querySelector('list');
const studentNode = listNode.querySelectorAll('student');

//Массив и объект, используемые для формирования результата
let studentsArr = [];
let result = {
    list: studentsArr
};

//Получение остальных DOM-нод
studentNode.forEach((element) => {
    let nameNode = element.querySelector('name');
    let firstNode = nameNode.querySelector('first');
    let secondNode = nameNode.querySelector('second');
    let ageNode = element.querySelector('age');
    let profNode = element.querySelector('prof');
    let nameAttr = nameNode.getAttribute('lang');
 
    //Запись результата    
    let student = {
        name: firstNode.textContent + ' ' + secondNode.textContent, 
        age: Number(ageNode.textContent), 
        prof: profNode.textContent, 
        lang: nameAttr
    };
    studentsArr.push(student);
});

//Вывод результата
console.log(result);



