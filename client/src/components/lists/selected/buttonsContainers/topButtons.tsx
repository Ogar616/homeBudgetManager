import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';

import { IconButton } from '@rmwc/icon-button';

import { StyledListButtonsContainer, getCategories } from '../../items/items';
import { StyledButtonsContainer } from '../../../listBox/listsContainer';
import { SortingMenu } from '../../sortingMenu';
import { ListType, Item } from '../../../../lib/interfaces';

interface SelectedTopButtonsProps {
  setVisibleDialog: (dialog?: string) => void;
  setChosenCategory: (list: ListType, category: string) => void;
  selected: Item[];
  updateList: () => void;
}

@observer
export class SelectedTopButtons extends React.Component<
  SelectedTopButtonsProps,
  {}
> {
  categorizeItems = (category: string): void => {
    const { updateList, setChosenCategory } = this.props;

    setChosenCategory('selected', category);
    updateList();
  };

  render() {
    const { setVisibleDialog, selected } = this.props;
    return (
      <StyledButtonsContainer>
        <StyledListButtonsContainer>
          <StyledFinishShoppingButton
            onClick={() => setVisibleDialog('FinishShoppingDialog')}
            icon={{ icon: 'add_shopping_cart', size: 'xlarge' }}
          />
          <SortingMenu
            categories={getCategories(selected)}
            categorizeItems={this.categorizeItems}
          />
        </StyledListButtonsContainer>
      </StyledButtonsContainer>
    );
  }
}

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;