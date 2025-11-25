document.addEventListener('DOMContentLoaded', () => {
    
    // --- ЧАСТИНА 1: ЕФЕКТ ДРУКУВАННЯ (TYPING EFFECT) ---
    const typingElement = document.getElementById("typing");
    
    // Перевіряємо: чи є на цій сторінці елемент для друку?
    if (typingElement) {
        const words = ["Web Developer", "Game Developer", "Programmer"];
        let i = 0;
        let j = 0;
        let currentWord = "";
        let isDeleting = false;

        function type() {
            currentWord = words[i];

            if (!isDeleting) {
                typingElement.textContent = currentWord.substring(0, j + 1);
                j++;

                if (j === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 1000);
                    return;
                }
            } else {
                typingElement.textContent = currentWord.substring(0, j - 1);
                j--;

                if (j === 0) {
                    isDeleting = false;
                    i = (i + 1) % words.length;
                }
            }
            setTimeout(type, isDeleting ? 80 : 120);
        }

        // Запускаємо друк
        type();
    }


    // --- ЧАСТИНА 2: ФІЛЬТРИ ПРОЄКТІВ ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Перевіряємо, чи є кнопки на сторінці
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Прибираємо клас active у всіх кнопок
                filterButtons.forEach(button => button.classList.remove('active'));
                // 2. Додаємо клас active натиснутій кнопці
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    // Отримуємо категорію поточної картки
                    const cardCategory = card.getAttribute('data-category');

                    // ВАЖЛИВА ЗМІНА: Використовуємо .includes()
                    // Це дозволяє одній картці мати кілька категорій (наприклад "game academic")
                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        // Показуємо картку
                        card.classList.remove('hide');
                        card.classList.add('show');
                    } else {
                        // Ховаємо картку
                        card.classList.remove('show');
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
});