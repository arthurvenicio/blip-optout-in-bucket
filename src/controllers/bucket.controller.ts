import { Request, Response } from "express";
import { ResultDto } from "../dtos/Result.dto";
import {
  GetAllTemplatesOnBucketSerice,
  PutOrPostemplatesOnBucketService,
} from "../services/bucket.service";

export const GetAllTemplatesOnBucket = async (req: Request, res: Response) => {
  try {
    const data = await GetAllTemplatesOnBucketSerice();
    return res.send(new ResultDto(true, data, null));
  } catch {
    return res.status(500).send({
      erro: "Internal server error",
    });
  }
};

export const PutOrPostemplatesOnBucket = async (
  req: Request,
  res: Response
) => {
  const { body } = req;
  try {
    const data = await PutOrPostemplatesOnBucketService(body);
    return res.send(new ResultDto(true, data, null));
  } catch (error) {
    return res.status(500).send({
      erro: "Internal server error",
    });
  }
};
