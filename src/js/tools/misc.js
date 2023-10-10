export function debounce(fn, delay = 200) {
    let timeout;

    return (e) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => fn(e), delay);
    }
}
