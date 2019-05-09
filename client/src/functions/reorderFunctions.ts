import { Item } from "./../lib/interfaces";

interface DnDItem {
  id: string;
  content: string;
}
interface IAppState {
  items: Item[];
  selected: Item[];
}

export const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
) => {

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: any,
  droppableDestination: any,
) => {

  console.log("src",droppableSource);
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};

  (result as any)[droppableSource.droppableId] = sourceClone;
  (result as any)[droppableDestination.droppableId] = destClone;

  console.log("move",result);
  return result;
};

export const sortItemsByName = (items: Item[]): Item[] =>
  items.sort((a: Item, b: Item): number => a.name.localeCompare(b.name));
