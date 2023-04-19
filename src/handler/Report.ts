import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Between } from "typeorm";

import { dbDS } from "../database/config";
import { User } from "../shared/entities/User";
import { reportSchema } from "../shared/helpers/gateway_validator";
import { customException } from "../shared/helpers/exceptions";

export async function vaccineList(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const { body } = event;
    const parsedBody = JSON.parse(body);
    const data = reportSchema.validateSync(parsedBody);

    const {
      vaccine_date_start,
      vaccine_date_end,
      vaccine_status,
      vaccine_type,
    } = data;

    let filter: object = {};

    if (typeof vaccine_status === "boolean")
      filter = { ...filter, vaccine_status };
    if (vaccine_type) filter = { vaccine_type, ...filter };
    if (vaccine_date_start && vaccine_date_start)
      filter = {
        ...filter,
        vaccine_date: Between(vaccine_date_start, vaccine_date_end),
      };

    await dbDS.initialize();
    const users: User[] = await User.find({
      where: filter,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: users,
      }),
    };
  } catch (e) {
    return customException(e);
  }
}
