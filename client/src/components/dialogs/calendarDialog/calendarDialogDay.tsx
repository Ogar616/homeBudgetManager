import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Cost } from '../../../lib/interfaces';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';

import { Legend } from 'recharts';

import { CostsCounter } from '../spendingsDialogs/spendingsTable/costsCounter';
import {
  StyledDialogTitle,
  StyledDialog
} from '../spendingsDialogs/spendingsDialog';

interface CalendarDialogDayProps {
  setVisibleDialog: (dialog?: string) => void;
  visibleDialog: string;
  showFailSnackbar: boolean;
  datePicked: string | Date;
  setDatePicked: (date: Date) => string;
  getCosts: () => void;
  costs: Cost[];
}

export class CalendarDialogDay extends React.Component<
  CalendarDialogDayProps,
  {}
> {
  render() {
    const {
      getCosts,
      costs,
      setVisibleDialog,
      visibleDialog,
      datePicked,
      setDatePicked
    } = this.props;
    const dayString = String(datePicked).slice(0, 10);
    const dayCosts = costs.filter((cost: Cost) =>
      cost.date.includes(dayString)
    );

    return (
      <StyledDialog
        open={visibleDialog.includes('Day')}
        aria-label='shopping-you-made'
      >
        <StyledDialogTitle>Spendings you made</StyledDialogTitle>
        <Legend />
        <DialogContent>
          {/*  <TableContainer getCosts={getCosts} costs={costs} />  */}

          <CostsCounter costs={dayCosts} time={dayString} />
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            icon='bar_chart'
            onClick={() => setVisibleDialog('ChartDialog')}
          />

          <Button onClick={() => setVisibleDialog()} color='primary'>
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    );
  }
}