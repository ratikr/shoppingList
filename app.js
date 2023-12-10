import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as listItemController from "./controllers/listItemController.js";
//import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewIndex(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
      return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") { 
    return await listItemController.viewListItems(request);
    } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
      return await listItemController.collectListItem(request);
    } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
      return await listItemController.createListItem(request);
    } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
      return await listController.completeList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
  
};

serve(handleRequest, { port: 7777 });
