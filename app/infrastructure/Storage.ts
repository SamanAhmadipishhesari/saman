    /**
     * This is a wrapper for LocalStorage.
     * It is replaceable with anything that you need
     */
export class AppStorage {
  static clear(): void {
    window.localStorage.clear();
  }

  static getItem(key: string): string | null {
    return window.localStorage.get(String(key)) ?? null;
  }

  static removeItem(key: string): void {
    window.localStorage.delete(String(key));
  }

  static key(index: number): string | null {
    return [...window.localStorage.keys()][Number(index)] ?? null;
  }

  static setItem(key: string, value: string): void {
    window.localStorage.set(String(key), String(value));
  }
}
