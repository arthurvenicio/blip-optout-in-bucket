import { Router } from "express";
import {
  GetAllTemplatesOnBucket,
  PutOrPostemplatesOnBucket,
} from "../controllers/bucket.controller";
import { LoadAllOptout } from "../controllers/optout.controlle";

const routes = Router();

routes.get("/api/v1/bucket", GetAllTemplatesOnBucket);
routes.post("/api/v1/bucket", PutOrPostemplatesOnBucket);
routes.get("/api/v1/loadOptOut", LoadAllOptout);

export default routes;
