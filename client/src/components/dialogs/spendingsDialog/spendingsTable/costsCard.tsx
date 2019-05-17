import * as React from 'react';

import { observer } from 'mobx-react';
import { Cost } from '../../../../lib/interfaces';

import { Card } from '@rmwc/card';
import { Typography } from '@rmwc/typography';

const countMothOutgoings = (costs: Cost[]) => {
  let sumOfCost: number = 0;

  if (costs.length > 0) {
    costs.forEach((cost: Cost) => (sumOfCost += cost.count));
  }
  return sumOfCost;
};

interface CostsCardProps {
  displayedCosts: Cost[];
}

@observer
export class CostsCard extends React.Component<CostsCardProps, {}> {
  render() {
    return (
      <Card>
        <Typography use='subtitle1'>
          This month you spent:{' '}
          {countMothOutgoings(this.props.displayedCosts) + ' zł'}
        </Typography>
      </Card>
    );
  }
}
