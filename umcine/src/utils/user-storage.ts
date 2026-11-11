export const USER_STORAGE_KEY = 'umcine-user';

export type UserInfo = {
  nickname: string;
  email: string;
};

export const DEFAULT_USER: UserInfo = {
  nickname: 'UMCine 사용자',
  email: 'user@example.com',
};

export function getUserInfo(): UserInfo {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) {
    return DEFAULT_USER;
  }

  try {
    const parsedUser = JSON.parse(savedUser);

    if (
      typeof parsedUser.nickname !== 'string' ||
      typeof parsedUser.email !== 'string'
    ) {
      return DEFAULT_USER;
    }

    return {
      nickname: parsedUser.nickname,
      email: parsedUser.email,
    };
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUserInfo(user: UserInfo) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
