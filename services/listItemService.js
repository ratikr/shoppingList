import { sql } from "../database/database.js";

const createListItem = async (listId, itemName) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${itemName})`;
};


const getItemsCount = async () => {
  const rows = await sql`select * from shopping_list_items`;
  return rows;
}

const findListItems = async (listId) => {
  
  const rows =  await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${ listId } order by collected, name asc`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return { id: 0, name: "No items on the list" };
};

const collectListItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${ id }`;
};

export { createListItem, getItemsCount, findListItems, collectListItem };