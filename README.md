# Панорамы
## Панорама главного входа
![Панорама главного входа](./client/UniGuide/public/screenshots/screenshot_1.png)
## Панорама парковки
![Панорама парковки](./client/UniGuide/public/screenshots/screenshot_2.png)
## Панорама спортивной площадки
![Панорама спортивной площадки](./client/UniGuide/public/screenshots/screenshot_3.png)

---

ВИДЕО ПРЕЗЕНТАЦИЯ ДОСТУПНА НА ЮТУБ ПО ССЫЛКЕ: https://youtu.be/mHv_ui-DnRY
ВЫНУЖДЕННАЯ МЕРА ТК ГИТХАБ НЕ ДАЕТ ЗАГРУЖАТЬ ФАЙЛЫ ВЕСОМ БОЛЬШЕ 100МБ

ВИДЕО В РЕПОЗИТОРИЙ УДАЛОСЬ ЗАГРУЗИТЬ ТОЛЬКО СЖАТОЕ
ССЫЛКА НА ВИДЕО В ОРИГИНАЛЬНОМ КАЧЕСТВЕ НА ГУГЛ-ДИСКЕ: https://drive.google.com/file/d/1dW97MEido5-3Ish7popeCFWOiYXHDkbK/view?usp=sharing

## Сборка и запуск проекта
Для запуска приложения использовать docker-compose.yml из корня проекта.
Все команды выполнять в корне репизотория.

1. Собрать под проекты. 
> docker-compose build

2. Запустить проект командой: 
> docker-compose up

После запуска проекта, запуск бэкэнда нужно подождать
То, что бэкенд запустился будет понятно по распечатке в консоли - Application listening on port 8080
Как правило, запуск бэкэнда занимает до 2х минут



## Сборка и запуск мобильного приложения
Мобильное приложение не способно работать на "localhost".

Для того чтобы запустить мобильное приложение потребуются определенные предустановленные программы:
1. Android studio Giraffe или более новая;
2. Эмулятор Андроид (например Google Pixel 5)
3. Работающий сервер приложения "UniGuide" в глобальном интернете.

Помимо предустановленных программ  потребуется выполнить ряд определенных действий:
1. Открыть файл "axios.ts" находящийся в папке "client/UniGuide/src/utils".
2. Найти константное поле "instance".
3. Заменить параметр "baseUrl" поля "instance" на ссылку "адрес вашего хоста/api".
4. Заменить параметр протокола соединения "androidScheme" в файле "client/UniGuide/capacitor.config.ts" на тот который использует ваш сервер (http/https) 
5. Открыть консоль
6. Открыть в консоли папку "/client/UniGuide"
7. Вызполнить команду "npm run build"
8. После того как  приложение "сбилдится" выполнить в консоли команду "npx cap sync"
9. После завершения процесса "билда" выполнить команду "npx cap open android" (тем самым запуститься андроид студия).
10. Запустить эмулятор
11. Запустить приложение в эмуляторе