"use strict"

//Ожидание загрузки контента
window.onload = function () {
    const parallax = document.querySelector('.header');

    if(parallax) {
        const content = document.querySelector('.header__container');
        const clouds = document.querySelector('.img-header__clouds');
        const mountains = document.querySelector('.img-header__mountains');
        const human = document.querySelector('.img-header__human');

        //Коэффиценты
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        //Скорость
        const speed = 0.05;

        //Объявление переменных
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle () {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            //Передача стилей внутрь объекта
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }

        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function (e) {
            //Получение ширины и высоты блока
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            // Ноль при положение курсора по середине
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // Получение процентов
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        // Parallax при скролле

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005){
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.scrollY / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
        }
    };
};