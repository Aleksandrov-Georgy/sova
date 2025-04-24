import {onMounted, onUnmounted} from 'vue';

/**
 * Обработка событий клавиатуры
 *
 * @example
 * // Использование в компоненте:
 * useKeyboard((e: KeyboardEvent) => {
 *   if (e.key === 'Escape') closeModal();
 * });
 *
 * @param {function(KeyboardEvent): void} callback - Функция-обработчик нажатия клавиш.
 */
export function useKeyboard(callback: (e: KeyboardEvent) => void) {
    onMounted(() => document.addEventListener('keydown', callback));
    onUnmounted(() => document.removeEventListener('keydown', callback));
}