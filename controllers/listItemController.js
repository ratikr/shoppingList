import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as listItemService from "../services/listItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const createListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");
 

  await listItemService.createListItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);

};

const viewListItems = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    currentListItems: await listItemService.findListItems(urlParts[2]),
  };
  
  return new Response(await renderFile("list.eta", data), responseDetails);
};



const collectListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listItemService.collectListItem(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createListItem, viewListItems, collectListItem };