import { CogIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Modal } from 'src/components';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderSettings(): JSX.Element {
  const settings = {
    _state: useState(false),
    get state() {
      return settings._state[0];
    },
    set state(value) {
      settings._state[1](value);
    },
    toggle() {
      settings.state = !settings.state;
    },
  };

  return (
    <div className="layout-header__container">
      <LayoutHeaderButton
        onClick={() => {
          settings.toggle();
        }}
      >
        <LayoutHeaderIcon icon={CogIcon} />
      </LayoutHeaderButton>
      {settings.state
        ? (
          <Modal
            heading="Settings"
            onClose={settings.toggle}
          >
            <Settings />
          </Modal>
        )
        : <></>}
    </div>
  );
}
