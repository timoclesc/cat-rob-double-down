import * as migration_20251010_031906 from './20251010_031906';

export const migrations = [
  {
    up: migration_20251010_031906.up,
    down: migration_20251010_031906.down,
    name: '20251010_031906'
  },
];
