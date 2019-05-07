import * as React from "react";
import * as styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { Item } from "./../lib/interfaces";

import { Items } from "./lists/items";
import { Selected } from "./lists/selected";
import { reorder, move, sortItemsByName } from "../functions/reorderFunctions";

import { Store } from "../lib/App/store";

interface ListsContainerProps {
    store: Store;
}

export class ListsContainer extends React.Component<ListsContainerProps, {}> {
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = (id: string) => {
      if (id === "items") {
       return this.props.store.items;
      }
    return this.props.store.selected;
  };

  onDragEnd = (result: any) => {
    const { source, destination } = result;
    const { getItems, getSelected } = this.props.store;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      if (JSON.stringify(this.props.store.items).indexOf(JSON.stringify((items as any)[0])) < 0) {
        // getSelected(items);
        //   changeSelectedOnServer(items);
      }
    } else {
      const result: any = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      result.droppable.forEach((item: any) => (item.checked = false));

      // getItems(sortItemsByName(result.droppable));
      // getSelected(result.droppable2);

      // changeItemsOnServer(result.droppable);
      // changeSelectedOnServer(result.droppable2);
    }
  };

  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* {store.showItems ? <Items /> : false}
          <Selected /> */}
        </DragDropContext>
      </>
    );
  }
}
