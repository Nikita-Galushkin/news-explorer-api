const UNAUTHORIZED = { message: 'Необходима авторизация' };
const REQUEST_ERROR = { message: 'Переданы некорректные данные' };
const NOT_FOUND_ERROR = { message: 'Запрашиваемый ресурс не найден' };
const SERVER_ERROR = { message: 'На сервере произошла ошибка' };
const FORBIDEN_ARTICLE_ERROR = { message: 'Недостаточно прав для выполнения операции' };
const NOT_FOUND_ARTICLE_ERROR = { message: 'Нет статьи с таким id' };
const LOGIN_ERROR = { message: 'Неправильные email или пароль' };
const NOT_FOUND_USER_ERROR = { message: 'Нет пользователя с таким id' };
const CONFLICT_USER_ERROR = { message: 'Пользователь уже существует' };
const REMOVE_MESSAGE = { message: 'Статья удалена' };
const CRASH_TEST_ERROR = { message: 'Сервер сейчас упадёт' };
const CELEBRATE_ERROR = { message: 'Некорректный адрес' };

module.exports = {
  UNAUTHORIZED,
  REQUEST_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  FORBIDEN_ARTICLE_ERROR,
  NOT_FOUND_ARTICLE_ERROR,
  LOGIN_ERROR,
  NOT_FOUND_USER_ERROR,
  CONFLICT_USER_ERROR,
  REMOVE_MESSAGE,
  CRASH_TEST_ERROR,
  CELEBRATE_ERROR,
};
