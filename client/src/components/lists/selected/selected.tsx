import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedSelected } from './provided/providedSelected';
import { StyledContainer } from '../items/items';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { IconButton } from '@rmwc/icon-button';
import styled from 'styled-components';

interface SelectedProps {
  getSelected: () => void;
  toggleShowFinishShoppingDialog: (cost?: Cost) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  setActiveItem: (list: ListType, index: number) => void;
  selected: Item[];
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  componentDidMount = () => {
    this.props.getSelected();
  };
  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      toggleShowEditDialog,
      toggleShowFinishShoppingDialog,
      selected
    } = this.props;

    return (
      <StyledContainer>
        <Droppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
              provided={provided}
            />
          )}
        </Droppable>
        <StyledButtonsContainer>
          <StyledFinishShoppingButton
            onClick={() => toggleShowFinishShoppingDialog()}
            icon={{ icon: 'add_shopping_cart', size: 'xlarge' }}
          />
        </StyledButtonsContainer>
      </StyledContainer>
    );
  }
}

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  margin-top: 20px;
  padding: 0;
`;
