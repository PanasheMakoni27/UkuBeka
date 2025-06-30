// Mock Session Storage Service
export const SessionStorageService = {
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load: (key) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },
  clear: (key) => {
    localStorage.removeItem(key);
  }
};
