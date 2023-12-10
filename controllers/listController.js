import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as listItemService from "../services/listItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};
 

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewIndex = async (request) => {
  const data = {
    listsCount: await listService.getListsCount(),
    itemsCount: await listItemService.getItemsCount(),
  };
  
  return new Response(await renderFile("index.eta", data), responseDetails);
}

const viewLists = async (request) => {

  const data = {
    lists: await listService.findAllNonCompletedLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};



const completeList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.completeById(urlParts[2]);

  return await requestUtils.redirectTo("/lists");
};


export { addList, viewLists, viewIndex, completeList };

