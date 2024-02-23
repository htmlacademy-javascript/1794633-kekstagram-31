function GeneratePhotos() {
  const QUANTITY = 25;
  const photos = [];

  for (let i = 1; i <= QUANTITY; i++) {
    photos.push(new Photo(i));
  }

  return photos;
}

function Photo(id) {
  const MIN_LIKES = 15, MAX_LIKES = 200;

  this.id = id;
  this.url = `photos/${id}.jpg`;
  this.description = `Фоточка ${id} котика`;
  this.likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
  this.comments = GenerateComments();
}

function GenerateComments() {
  const MIN_COMMENTS = 0, MAX_COMMENTS = 30;
  const MIN_COMMENT_ID = 1, MAX_COMMENT_ID = 300;
  const commentsQuantity = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];

  for(let i = MIN_COMMENTS; i <= commentsQuantity; i++) {
    comments.push(new Comment(createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID)));
  }

  return comments;
}

function Comment(IdGenerator) {
  const MIN_AVATAR_ID = 1, MAX_AVATAR_ID = 6;

  this.id = IdGenerator();
  this.avatar = `img/avatar-${getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`;
  this.message = getRandomComment();
  this.name = getRandomAuthor();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomTextRow(text) {
  const rows = text.split('\n');
  const randomIndex = Math.floor(Math.random() * rows.length);
  return rows[randomIndex];
}

function getRandomComment() {
  const TEMPLATE_TEXT =
    'Всё отлично!\n' +
    'В целом всё неплохо. Но не всё.\n' +
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.\n' +
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.\n' +
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.\n' +
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

  return getRandomTextRow(TEMPLATE_TEXT);
}

function getRandomAuthor() {
  const TEMPLATE_TEXT =
    'Вася Петров\n' +
    'Петя Васечкин\n' +
    'Маша Старцева\n' +
    'Сережа Сыроежкин\n' +
    'Виктор Иванович Громов';

  return getRandomTextRow(TEMPLATE_TEXT);
}

GeneratePhotos().forEach((photo) => console.log(photo));
