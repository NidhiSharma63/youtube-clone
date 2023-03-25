interface ISetValueToLs {
  email?: string | null;
  profileUrl?: string | null;
  displayedName?: string | null;
  videoId?: string;
}

export const setValueTOLS = (key: string, value: ISetValueToLs) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLS = (key: string): string | null => {
  return localStorage.getItem(key);
};
