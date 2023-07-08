<h1>Интернет-магазин Популярная техника</h1>
<ul>
    <li>Проект реализован с использованием стека: React + TypeScript + Firebase + Redux.</li>
    <li>В проекте реализованы следующие страницы - Главная, Страница категории, Страница подкатегории, Страница товара, Корзина, Страница авторизации/регистрации Страница администратора.</li>
    <li>На странице администратора предусмотрена возможность редактирования существующих и создания новых единиц товаров.</li>
    <li><b><big>Для доступа на страницу администратора используйте логин admin@bk.ru и пароль Admin@2612</big></b></li>
    <li>Проект оперирует четырьмя сущностями - категории, подкатегории, товары и корзина.</li>
    <li>Сущность категории, подкатегории и товары за пределами пользовательской сессии хранится в Farebase.</li>
    <li>Сущность cart за пределами пользовательской сессии хранится в LocalStorage.</li>
    <li>В пределах пользовательской сессии все сущности хранятся в Redux, чтобы обеспечить доступ к данным из всех частей приложения.</li>
    <li>Любое изменение пользователем данных каждой из сущностей приводит к сохранению этих данных в пределах сессии (в Redux) и за её пределами (в Farebase и LocalStorage).</li>
    <li>На всех страницах приложения предусмотрена адаптивная вёрстка, максимально.</li>
    <li>В случае попыток перехода на несуществующую страницу, предусмотрена переадресация на страницу 404.</li>
    <li>Любые действия, подразумевающие ожидание, сопровождаются анимацией loader'а (спиннера).</li>
    <li>В шапке помимо прочих элементов предусмотрен блок корзины, в динамическом режиме отображающий общее количество единиц товаров, а также блок, отображающий имя текущего авторизованного пользователя.</li>
    <li>Все значимые действия пользователя сопровождаются соответствующими информационными сообщениями в правой-верхней части экрана.</li>
</ul>