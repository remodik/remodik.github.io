document.addEventListener("DOMContentLoaded", function () {
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">Мой сайт</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="../index.html">Главная</a></li>
                        <li class="nav-item"><a class="nav-link" href="../page1.html">Языки</a></li>
                        <li class="nav-item"><a class="nav-link" href="../page2.html">Проекты</a></li>
                        <li class="nav-item"><a class="nav-link" href="../page3.html">Опыт</a></li>
                        <li class="nav-item"><a class="nav-link" href="../page4.html">Discord-бот</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
