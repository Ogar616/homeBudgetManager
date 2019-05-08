import * as React from "react";
import * as styled from "styled-components";
import { Store } from "../../lib/App/store";

import { observer } from "mobx-react";

import { Item } from "../../lib/interfaces";

import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from "@rmwc/list";
import { IconButton } from "@rmwc/icon-button";
import { Icon } from "@rmwc/icon";

import { Checkbox } from "@rmwc/checkbox";

import { FinishDialog } from "../dialogs/finishDialog";

interface SelectedProps {
  store: Store;
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  componentDidMount = () => {

    // getSelectedFromServer(this.props.getSelected);
  };

  render() {
    const {
      toggleShowEditDialog,
      selected,
      showEditDialog,
      toggleShowFinishDialog,
      toggleCheckItems
    } = this.props.store;

    const list = "selected";

    // console.log(JSON.parse(selected));

    return (
      <>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {providedDraggable => (
                    <div>
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                      <ListItem key={index} onClick={() => toggleCheckItems("selected", index)}>
                        <Checkbox
                          //   className={checkbox}
                          checked={
                            selected[index] ? selected[index].checked : false
                          }
                            tabIndex={-1}
                            value={"checked"}
                          //   disableRipple
                        />
                        <ListItemText>
                          <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                          <ListItemSecondaryText>
                            {item.info}
                          </ListItemSecondaryText>
                        </ListItemText>
                        <IconButton
                          aria-label="Edit item"
                          onClick={() =>toggleShowEditDialog({    ///////////////////////////
                            list: "selected",
                            index: index
                          })}
                        >
                          <Icon icon="edit" />
                        </IconButton>
                      </ListItem>
                       
                      </div>
                      {providedDraggable.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button color="primary" onClick={toggleShowFinishDialog}>
          Finish shopping
        </Button>
        <FinishDialog store={this.props.store} />
      </>
    );
  }
}