export type StateAnimation = {
  _isShowed: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  _ms: number;
  hide: () => Promise<void>;
  isDisplay: boolean;
  isShowed: StateAnimation['_isShowed'][0];
  show: () => void;
};
