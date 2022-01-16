import { CogIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Popper } from 'src/components';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderSettings(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [settingsIsVisible, setSettingsIsVisible] = useState(false);

  const handleClick = (): void => {
    if (settingsIsVisible) {
      setSettingsIsVisible(false);
    } else {
      setSettingsIsVisible(true);
    }
  };
  const handleClose = (ev: FocusEvent): void => {
    if (btnRef.current !== ev.relatedTarget) setSettingsIsVisible(false);
  };

  return (
    <div
      className="layout-header__container"
      ref={rootRef}
    >
      <LayoutHeaderButton
        ref={btnRef}
        onClick={handleClick}
      >
        <LayoutHeaderIcon icon={CogIcon} />
      </LayoutHeaderButton>
      <Popper
        anchorRef={rootRef}
        isVisible={settingsIsVisible}
        onClose={handleClose}
      >
        <Settings />
      </Popper>
    </div>
  );
}
