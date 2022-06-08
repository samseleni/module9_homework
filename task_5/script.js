/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст 
«Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст 
«Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст 
«Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

//Получение данных из localstorage
let data = localStorage.getItem('savedData');
//Поиск кнопки для запроса и нода для записи его результата
const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

let url = '';

//Обработчик на кнопку для обработки запроса
btnNode.addEventListener('click', async () => {  
    let num = Number(document.querySelector('.j-input__number').value);
    let limit = Number(document.querySelector('.j-input__limit').value);
    if ((num < 1 || num > 10 || !Number.isInteger(num)) && (limit < 1 || limit > 10 || !Number.isInteger(limit))) resultNode.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`;
    else if (num < 1 || num > 10 || !Number.isInteger(num)) resultNode.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10</p>`;
    else if (limit < 1 || limit > 10 || !Number.isInteger(limit)) resultNode.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`;
    else {
        url = `https://picsum.photos/v2/list?page=${num}&limit=${limit}`;
        const requestResult = await useRequest(url);
        imagesList(requestResult);
    }
}) 

//Получение картинок при перезагрузке
imagesList(JSON.parse(data));

//Функция для осуществления запроса
function useRequest(url) {
    return fetch(url)
        .then((response) => {
        return response.json();
        })
        .then((data) => { 
            localStorage.setItem('savedData', JSON.stringify(data));
            return data; 
        })
        .catch(() => { resultNode.innerHTML = '<p>error</p>' });
}  

//Функция обработки результата запроса
function imagesList(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = 
        `<div class="card">
            <img src="${item.download_url}" class="image"/>
            <p>${item.author}</p>
        </div>`;
        cards += cardBlock;
    });
    resultNode.innerHTML = cards;
}  

