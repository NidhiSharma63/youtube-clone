interface ISetValueToLs {
  email?: string | null;
  profileUrl?: string | null;
  displayedName?: string | null;
  savedPlayListValueArray?: string;
  playlistName?: string;
}

export const setValueTOLS = (key: string, value: ISetValueToLs): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLS = (key: string): string | null => {
  return localStorage.getItem(key);
};
