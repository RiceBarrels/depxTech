export function suppressHydrationWarnings() {
  if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0].includes('Warning: Text content did not match') ||
          args[0].includes('Warning: Expected server HTML to contain')) {
        return;
      }
      originalError.call(console, ...args);
    };
  }
} 