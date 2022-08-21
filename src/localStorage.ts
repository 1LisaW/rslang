const STORAGE_NAME = 'RSLang_Project_Storage';

class StorageWorker {
  private myStorageUserId;

  private myStorageToken;

  private myStorageRefreshToken;

  constructor() {
    this.myStorageUserId = `${STORAGE_NAME}_UserId`;
    this.myStorageToken = `${STORAGE_NAME}_Token`;
    this.myStorageRefreshToken = `${STORAGE_NAME}_RefreshToken`;
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

export default new StorageWorker();
