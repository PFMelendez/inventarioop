const antibind = (fn, ...args) => e => fn(e, ...args);

export default { antibind };