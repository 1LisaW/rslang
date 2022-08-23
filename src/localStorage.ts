const { REACT_APP_STORAGE_NAME } = process.env;
class StorageWorker {
  private myStorageUserId;

  private myStorageToken;

  private myStorageRefreshToken;

  constructor() {
    this.myStorageUserId = `${REACT_APP_STORAGE_NAME}_UserId`;
    this.myStorageToken = `${REACT_APP_STORAGE_NAME}_Token`;
    this.myStorageRefreshToken = `${REACT_APP_STORAGE_NAME}_RefreshToken`;
  }

  get userId() {
    return JSON.parse(localStorage.getItem(this.myStorageUserId) || '{}');
  }

  set userId(newValue) {
    localStorage.setItem(this.myStorageUserId, JSON.stringify(newValue));
  }

  get token() {
    return JSON.parse(localStorage.getItem(this.myStorageToken) || '{}');
  }

  set token(newValue) {
    localStorage.setItem(this.myStorageToken, JSON.stringify(newValue));
  }

  get refreshToken() {
    return JSON.parse(localStorage.getItem(this.myStorageRefreshToken) || '{}');
  }

  set refreshToken(newValue) {
    localStorage.setItem(this.myStorageRefreshToken, JSON.stringify(newValue));
  }

  initDataFromStorage = (name: string) => {
    switch (name) {
      case 'userId': {
        return this.userId;
      }
      case 'token': {
        return this.token;
      }
      case 'refreshToken': {
        return this.refreshToken;
      }
      default: {
        return null;
      }
    }
  };

  deleteDataFromStorage = () => {
    localStorage.clear();
  };
}

const StorageInstance = new StorageWorker();

export default StorageInstance;
