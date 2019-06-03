import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';
import '@rmwc/icon/icon.css';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledButtonsContainer } from '../../listBox/listsContainer';

interface ItemsProps {
  getItems: () => void;
  deleteItem: (name: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, index: number) => void;
  items: Item[];
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  componentDidMount = () => {
    this.props.getItems();
  };
  render() {
    const { items, setVisibleDialog, setActiveItem } = this.props;

    return (
      <StyledContainer>
        <StyledButtonsContainer>
          <StyledAddShoppingItemIconButton
            onClick={() => setVisibleDialog('AddShoppingItemDialog')}
            icon={{ icon: 'add_circle', size: 'xlarge' }}
          />
        </StyledButtonsContainer>
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              setActiveItem={setActiveItem}
              setVisibleDialog={setVisibleDialog}
              items={items}
              provided={providedDroppable2}
            />
          )}
        </Droppable>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 50px;
  min-width: 150px;
  margin: 5px;
`;

const StyledAddShoppingItemIconButton = styled(IconButton)`
  color: #4cad4f;
  padding: 0;
`;
