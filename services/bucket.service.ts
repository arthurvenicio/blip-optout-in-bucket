import { randomUUID } from "crypto";
import { CommandsContants } from "../constants/commands.contants";
import {
  ArrayOfOptOut,
  CommandsResponse,
  OptoutedAtT,
  Template,
} from "../types/bucket.types";
import { api } from "./../config/api";

export const GetAllTemplatesOnBucketSerice = async () => {
  try {
    const request = {
      method: CommandsContants.METHOD_GET,
      id: randomUUID(),
      uri: CommandsContants.BUCKET_TEMPLATE_LIST_URI,
    };

    const { data } = await api.post("/commands", request);

    const apiRequest: CommandsResponse = data;
    const templatesList = apiRequest.resource.template_list;
    return templatesList;
  } catch (err) {
    return console.log(err);
  }
};

export const PutOrPostemplatesOnBucketService = async (body: Template[]) => {
  const allTemplates = await GetAllTemplatesOnBucketSerice();
  if (!allTemplates) return "Don't have templates on bucket";

  body.forEach((t) => {
    const template = allTemplates.find(
      (template) => template.template_name === t.template_name
    );
    if (template) {
      template.template_name = t.template_name;
      template.template_version = t.template_version;
      template.flow_id = t.flow_id;
      template.notification_response_state_id =
        t.notification_response_state_id;
      template.has_parameters = t.has_parameters;
      template.fixed_parameters
        ? (template.fixed_parameters = t.fixed_parameters)
        : null;
    } else {
      allTemplates.push(t);
    }
  });

  const apiRequest = {
    type: "application/json",
    resource: {
      template_list: allTemplates,
    },
    method: "set",
    id: randomUUID(),
    uri: "/buckets/broadcast:template_list",
  };

  const { data } = await api.post("/commands", apiRequest);
  return data;
};

export const GetAllOptOutOnBucketService = async () => {
  try {
    const TokensBot = process.env.BOT_TOKENS;
    const TokensBotArray = TokensBot?.split(",");
    const result: ArrayOfOptOut[] = [];

    if (!TokensBotArray) return;

    const t = TokensBotArray.map(async (token) => {
      const optOuts = await GetOptOutOnBucketService(token);
      return optOuts;
    });

    const ArrayOfOptOut = Promise.all(t);

    (await ArrayOfOptOut).forEach((x) =>
      x.forEach((o) => {
        result.push(o);
      })
    );

    return result;
  } catch (err) {
    return err;
  }
};

export const GetOptOutOnBucketService = async (
  botToken: string
): Promise<ArrayOfOptOut[]> => {
  const apiRequest = {
    method: CommandsContants.METHOD_GET,
    id: randomUUID(),
    uri: CommandsContants.BUCKET_OPTOUT_URI,
  };
  const { data } = await api.post("/commands", apiRequest, {
    headers: {
      "Content-Type": "application/json",
      Authorization: botToken,
    },
  });

  if (!data.resource) return [];

  const { OptoutedContacts } = data.resource;
  let newArray = Array<ArrayOfOptOut>();

  const keys = Object.keys(OptoutedContacts);
  const values = Object.values(OptoutedContacts);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].split("@")[0];
    const value: OptoutedAtT = values[i] as any;
    const dateF = new Date(value.OptoutedAt).toLocaleDateString("pt-BR");

    newArray.push({
      number: key,
      OptoutedAt: dateF,
    });
  }
  return newArray;
};
