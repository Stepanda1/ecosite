const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz {
    constructor(type, questions, results) {
        //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index) {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if (value >= 1) {
            correct = index;
        }
        else {
            //Иначе ищем, какой ответ может быть правильным
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next() {
        this.current++;

        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

//Класс, представляющий вопрос
class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

//Класс, представляющий ответ
class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

//Класс, представляющий результат
class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value) {
        if (this.value <= value) {
            return true;
        }
        else {
            return false;
        }
    }
}



//Массив с результатами
const results =
    [
        new Result("Вам многому нужно научиться", 0),
        new Result("Вы уже неплохо разбираетесь", 1),
        new Result("Ваш уровень выше среднего", 3),
        new Result("Вы в совершестве знаете тему, заберите свой сертификат", 5)
    ];

//Массив с вопросами
const questions =
    [
        new Question("Какой вид фильтрации на данный момент считается самым эффективным?",
            [
                new Answer("Макрофильтрация", 0),
                new Answer("Нанофильтрация", 1),
                new Answer("Микрофильтрация", 0),
                new Answer("Ультрафильтрация", 0)
            ]),

        new Question("Какой газ выделяется автомобильными выхлопами и является крайне опасным для человека?",
            [
                new Answer("Угарный газ", 1),
                new Answer("Углекислый газ", 0),
                new Answer("Оксид серы", 0),
                new Answer("Фтор", 0)
            ]),

        new Question("Комплекс работ по восстановлению почвы или водоёма сроком до 15 лет - это",
            [
                new Answer("Орошение", 0),
                new Answer("Эрозия", 0),
                new Answer("Почвообразование", 0),
                new Answer("Рекультивация", 1)
            ]),

        new Question("Сколько тонн пыли уничтожает 1 га леса?",
            [
                new Answer("1", 0),
                new Answer("500", 0),
                new Answer("100", 1),
                new Answer("80", 0)
            ]),

        new Question("Штраф за убийство благородного оленя составляет",
            [
                new Answer("80000", 0),
                new Answer("70000", 1),
                new Answer("40000", 0),
                new Answer("120000", 0)
            ]),

    ];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
    //Проверяем, есть ли ещё вопросы
    if (quiz.current < quiz.questions.length) {
        //Если есть, меняем вопрос в заголовке
        headElem.innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
    else {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Очки: " + quiz.score;
        if (quiz.score == 5) {
            document.querySelector('.download').removeAttribute('id');
        }
        else {
            document.querySelector('.reset').removeAttribute('id');
        }
    }
}

function Init() {
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);

    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    //Делаем кнопки серыми
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if (quiz.type == 1) {
        if (correct >= 0) {
            btns[correct].className = "button button_correct";
        }

        if (index != correct) {
            btns[index].className = "button button_wrong";
        }
    }
    else {
        //Иначе просто подсвечиваем зелёным ответ пользователя
        btns[index].className = "button button_correct";
    }

    //Ждём секунду и обновляем тест
    setTimeout(Update, 1000);
}
