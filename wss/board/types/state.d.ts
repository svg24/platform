import type { Dispatch, SetStateAction } from 'react';

export type StateAnimation = {
  _isShowed: StateAnimationIsShowed;
  _ms: number;
  hide: () => Promise<void>;
  isDisplay: boolean;
  isShowed: StateAnimationIsShowed;
  show: () => void;
};

type StateAnimationIsShowed = [boolean, Dispatch<SetStateAction<boolean>>];
