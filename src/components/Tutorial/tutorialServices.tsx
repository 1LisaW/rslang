import Api from '../../Api/api';
import {
  PaginatedResults,
  Difficulty,
  UsersWordData,
} from '../../Api/api-types';

enum DifficultyButtonNames {
  Ease = 'Легко',
  Hard = 'Сложно',
}

enum IsLearnedButtonNames {
  Know = 'знаю',
  NotKnow = 'не знаю',
}

export const getDifficultyButtonData = (word: PaginatedResults) => {
  const isDifficult =
    word.userWord &&
    word.userWord.difficulty &&
    word.userWord.difficulty === Difficulty.Hard;
  const colorBtn: 'primary' | 'secondary' = isDifficult
    ? 'secondary'
    : 'primary';
  const difficultyButton = {
    text: isDifficult ? DifficultyButtonNames.Hard : DifficultyButtonNames.Ease,
    colorBtn,
    isDifficult: isDifficult ? Difficulty.Hard : Difficulty.Easy,
  };

  return difficultyButton;
};

export const getIsLearnedButtonData = (word: PaginatedResults) => {
  const isLearned =
    word.userWord && word.userWord.optional && word.userWord.optional.isLearned;
  const colorBtn: 'secondary' | 'primary' = isLearned ? 'primary' : 'secondary';
  const isLearnedButton = {
    text: isLearned ? IsLearnedButtonNames.Know : IsLearnedButtonNames.NotKnow,
    colorBtn,
    isLearned,
  };

  return isLearnedButton;
};

export const updateUserWord = (
  currentUserId: string,
  userWord: UsersWordData,
) => {
  const { id, ...updateUserWordData } = userWord;
  Api.updateUsersWord(currentUserId, id, updateUserWordData);
  return { ...userWord };
};

export const createUserWord = (
  currentUserId: string,
  userWord: UsersWordData,
) => {
  const { id, ...updateUserWordData } = userWord;
  Api.createUsersWord(currentUserId, id, {
    ...updateUserWordData,
  });
  return { ...userWord };
};
