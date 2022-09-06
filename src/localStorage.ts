const { REACT_APP_STORAGE_NAME } = process.env;
class StorageWorker {
  private myStorageUserId;

  private myStorageToken;

  private myStorageRefreshToken;

  private myStorageCurrentGroup;

  private myStorageCurrentPage;

  private myStoragePageInGroup;

  constructor() {
    this.myStorageUserId = `${REACT_APP_STORAGE_NAME}_UserId`;
    this.myStorageToken = `${REACT_APP_STORAGE_NAME}_Token`;
    this.myStorageRefreshToken = `${REACT_APP_STORAGE_NAME}_RefreshToken`;
    this.myStorageCurrentGroup = `${REACT_APP_STORAGE_NAME}_CurrentGroup`;
    this.myStorageCurrentPage = `${REACT_APP_STORAGE_NAME}_CurrentPage`;
    this.myStoragePageInGroup = `${REACT_APP_STORAGE_NAME}_PageInGroup`;
  }

  get userId() {
    const data = localStorage.getItem(this.myStorageUserId);
    return data ? JSON.parse(data) : '';
  }

  set userId(newValue) {
    localStorage.setItem(this.myStorageUserId, JSON.stringify(newValue));
  }

  get token() {
    const tkn = localStorage.getItem(this.myStorageToken);
    const res = tkn ? JSON.parse(tkn) : '';
    return res;
  }

  set token(newValue) {
    localStorage.setItem(this.myStorageToken, JSON.stringify(newValue));
  }

  get refreshToken() {
    const refreshTkn = localStorage.getItem(this.myStorageRefreshToken);
    const res = refreshTkn ? JSON.parse(refreshTkn) : '';
    return res;
  }

  set refreshToken(newValue) {
    localStorage.setItem(this.myStorageRefreshToken, JSON.stringify(newValue));
  }

  get currentPage() {
    const currentPage = localStorage.getItem(this.myStorageCurrentPage);
    const res = currentPage ? JSON.parse(currentPage) : 0;
    return res;
  }

  set currentPage(newValue) {
    localStorage.setItem(this.myStorageCurrentPage, JSON.stringify(newValue));
  }

  get currentGroup() {
    const currentGroup = localStorage.getItem(this.myStorageCurrentGroup);
    const res = currentGroup ? JSON.parse(currentGroup) : 0;
    return res;
  }

  set currentGroup(newValue) {
    localStorage.setItem(this.myStorageCurrentGroup, JSON.stringify(newValue));
  }

  get pageInGroup() {
    const pageInGroup = localStorage.getItem(this.myStoragePageInGroup);
    const res = pageInGroup ? JSON.parse(pageInGroup) : 0;
    return res;
  }

  set pageInGroup(newValue) {
    localStorage.setItem(this.myStoragePageInGroup, JSON.stringify(newValue));
  }

  setUserSettings(currentGroup: number, pageInGroup: number) {
    localStorage.setItem(
      this.myStorageCurrentGroup,
      JSON.stringify(currentGroup),
    );
    localStorage.setItem(
      this.myStorageCurrentPage,
      JSON.stringify(pageInGroup),
    );
    localStorage.setItem(
      this.myStoragePageInGroup,
      JSON.stringify({
        ...this.pageInGroup,
        [currentGroup]: pageInGroup,
      }),
    );
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
      case 'currentPage': {
        return this.currentPage;
      }
      case 'currentGroup': {
        return this.currentGroup;
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
