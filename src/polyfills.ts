// Polyfills that must be applied before any other code runs.
// Some libraries (e.g., sockjs-client) assume a Node-like environment and expect `global`.

// Ensure `global` exists in the browser runtime.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).global = window;

// Some packages may check `globalThis.global`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).global = window;
