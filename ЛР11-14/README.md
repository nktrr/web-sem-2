# Канбан доска
## Разработчик

* Руднев Никита, 191-362.

## Содержимое проекта

Попадая на главную страницу, пользователь должен пройти авторизацию, введя имя пользователя.
Оно будет идентифицировать его на протяжении всей работы приложения.
Затем, пользователь добавляет задачу с описанием, которое он сам придумает.
Созданная задача превращается в карточку в колонке "В плане", после этого начинается жизненный цикл карточки.
Он состоит из трех этапов:

* Состояние "В плане";
* Состояние "В работе";
* Состояние "Готово".

По завершении работы с карточкой, отображается время, за которое задача была выполнена.
Карточки можно редактировать и изменять, а так же перетаскивать из колонки в колонку с помощью функии Drag&Drop.

## Технические средства

В создании приложения использовались:

* Html5;
* CSS3;
* Vue JS;

## Структура проекта

В файле main.js представлена структура проекта.
В нем можно увидеть наше состояние карточек на начало работы приложения, так называемый "State".
А так же, методы работы со стейтом.
В методах прописан функционал:

* Добавления карточек;
* Перемещения;
* Удаления;
* Изменения;
* Действия при Drag&Drop;
* Завершения карточки.