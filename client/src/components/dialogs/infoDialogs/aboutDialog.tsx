import * as React from 'react';

import { observer } from 'mobx-react';

import { Dialog, DialogActions, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';

import { StyledDialogTitle } from '../expensesDialogs/spendingsDialog';
import { StyledButtonContainer } from '../../listBox/listsContainer';

const aboutDialogButtons = [
  {
    icon: 'https://image.flaticon.com/icons/svg/25/25231.svg',
    href: 'https://github.com/Ogar616'
  },
  {
    icon:
      'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-512.png',
    href: 'https://www.linkedin.com/in/kamilsobczyk6/'
  },
  {
    icon: 'https://image.flaticon.com/icons/svg/17/17216.svg',
    href: 'tel:796224021'
  }
];

interface AboutDialogProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
}

export const AboutDialog = observer(
  ({ visibleDialog, setVisibleDialog }: AboutDialogProps) => (
    <Dialog
      open={visibleDialog === 'AboutDialog'}
      aria-labelledby='about'
      aria-describedby='about'
    >
      <StyledDialogTitle>Home Budget Manager</StyledDialogTitle>
      <DialogContent>
        Coded by Kamil Sobczyk 2019
        <br />
        <StyledButtonContainer>
          {aboutDialogButtons.map(button => (
            <IconButton
              key={button.icon}
              icon={button.icon}
              style={{
                width: '45px',
                height: '45px',
                backgroundSize: 'cover',
                margin: '10px'
              }}
              tag='a'
              target='_blank'
              href={button.href}
            />
          ))}
        </StyledButtonContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleDialog()} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
);
