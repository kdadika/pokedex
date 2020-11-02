import { useEffect, useState } from 'react';

export default function GetFavorite(defaultValue) {
  const [value, setValue] = useState(() => {
    const favoriteValue = window.localStorage.getItem(defaultValue);

    return favoriteValue;
  });

  useEffect(() => {
    window.localStorage.setItem(defaultValue, value);
  }, [defaultValue, value]);

  return [value, setValue];
}
