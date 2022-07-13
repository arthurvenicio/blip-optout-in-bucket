import { Response, Request } from "express";
import { ResultDto } from "../dtos/Result.dto";
import { GetAllOptOutOnBucketService } from "../services/bucket.service";

export const LoadAllOptout = async (req: Request, res: Response) => {
  try {
    const result = await GetAllOptOutOnBucketService();
    return res.send(new ResultDto(true, result, null));
  } catch {
    return res.send(new ResultDto(false, null, ["An error occurred"]));
  }
};
