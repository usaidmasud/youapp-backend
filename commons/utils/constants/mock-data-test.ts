export const MOCK_USER_CONSTANT = {
  _id: '1',
  username: 'username',
  email: 'email@mail.com',
  password: 'password',
  profile: {
    _id: '1',
    birthDate: new Date().toISOString(),
    name: 'name',
    height: 1,
    weight: 1,
    gender: 'gender',
    horoscope: 'horoscope',
    zodiac: 'zodiac',
    interests: ['interests'],
    imageUrl: 'imageUrl',
  },
};

export const MOCK_LOGIN_CONSTANT = {
  usernameOrEmail: 'username',
  password: 'password',
};

export const MOCK_REGISTER_CONSTANT = {
  username: 'username',
  email: 'email@mail.com',
  password: 'password',
};

export const MOCK_PROFILE_CONSTANT = {
  userId: '1',
  birthDate: 'birthDate',
  name: 'name',
  height: 1,
  weight: 1,
  gender: 'gender',
  horoscope: 'horoscope',
  zodiac: 'zodiac',
  interests: ['interests'],
  imageUrl: 'imageUrl',
};
