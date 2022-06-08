// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
// При клике на кнопку происходит следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
// где get-параметр limit — это введённое число. После получения данных вывести ниже картинки на экран.

//Поиск нода для вставки запроса
const resultNode = document.querySelector('.j-result');
//Поиск кнопки, при нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

let url = '';

//Обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    let num = Number(document.querySelector('input').value);
    if (!Number.isInteger(num)) console.log('Введите целое число');
    else if (num >= 1 && num <= 10) {
        url = `https://picsum.photos/v2/list?limit=${num}`;
        useRequest(url, displayResult);
    }
    else console.log(`Число ${num} вне диапазона от 1 до 10`);
})

//Функция-обертка над XMLHttpRequest, осуществляющая запрос
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };
    
    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};

//Функция обработки полученного результата apiData - объект с результатом запроса
function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
        const cardBlock = 
        `<div class="card">
            <img src="${item.download_url}" class="card-image"/>
            <p>${item.author}</p>
        </div>`;
        cards += cardBlock;
    });
        
    resultNode.innerHTML = cards;
}

