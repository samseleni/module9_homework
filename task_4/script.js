/* Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, 
где первое число — ширина картинки, второе — высота. */

//Поиск нода для записи результата
const resultNode = document.querySelector('.j-result');
//Поиск кнопки, при нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

//Обработчик на кнопку для осуществления запроса
btnNode.addEventListener('click', () => {  
    let width = Number(document.querySelector('.j-input__width').value);
    let height = Number(document.querySelector('.j-input__height').value);
    if (width < 100 || width > 300 || height < 100 || height > 300 || !Number.isInteger(width) || !Number.isInteger(height)) {
        resultNode.innerHTML = `<p>Одно из чисел вне диапазона от 100 до 300</p>`
    } else {
        let url = `https://picsum.photos/${width}/${height}`;
        fetch(url)
        .then((response) => {
            resultNode.innerHTML = `<img class="image" src=${url}>`;
        })
        .catch(() => {console.log('error');})
    }
})