let cachedPhotos = [];

const cacheLoadedPhotos = (loadedPhotos) => {
  cachedPhotos = loadedPhotos;
};

const getPhotoByIdFromCache = (id) => cachedPhotos.find((photo) => Number(photo.id) === Number(id));

export { cacheLoadedPhotos, getPhotoByIdFromCache };
