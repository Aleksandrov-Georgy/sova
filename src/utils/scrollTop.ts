
/**
 * Прокручивает страницу вверх
 * */
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};