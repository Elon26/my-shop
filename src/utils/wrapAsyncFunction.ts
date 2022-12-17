export function wrapAsyncFunction<ARGS extends unknown[]>(
    fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
    return (...args) => {
        // eslint-disable-next-line no-void
        void fn(...args);
    };
}
