const antibind = (fn, ...args) => e => fn(e, ...args);

class LocalStorage {
  get = item => localStorage.getItem(item)
  set = (item, str) => localStorage.setItem(item, str)
  remove = item => localStorage.removeItem(item)
}

export default { antibind, LocalStorage };