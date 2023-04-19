import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { userSchema } from "../shared/helpers/gateway_validator";
import { dbDS } from "../database/config";
import { User } from "../shared/entities/User";
import { customException } from "../shared/helpers/exceptions";

export async function getAll(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    await dbDS.initialize();
    const users: User[] = await User.find();

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

export async function addEmployee(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const { body } = event;
    const parsedBody = JSON.parse(body);
    const data = userSchema.validateSync(parsedBody) as User;

    await dbDS.initialize();
    await User.save(data);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Registro creado correctamente",
      }),
    };
  } catch (e) {
    return customException(e);
  }
}

export async function getById(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const {
    pathParameters: { id },
  } = event;
  try {
    await dbDS.initialize();
    const user: User = await User.findOneOrFail({ where: { id } });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: user,
      }),
    };
  } catch (e) {
    return customException(e);
  }
}

export async function updateEmployee(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const {
    body,
    pathParameters: { id },
  } = event;
  try {
    const payload = userSchema.validateSync(JSON.parse(body)) as User;

    await dbDS.initialize();
    const user: User = await User.preload({ id, ...payload });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Registro no encontrado",
        }),
      };
    }
    await User.save(user);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: user,
      }),
    };
  } catch (e) {
    return customException(e);
  }
}

export async function deleteEmployee(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const {
    pathParameters: { id },
  } = event;
  try {
    await dbDS.initialize();
    const user: User = await User.findOne({ where: { id } });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Registro no encontrado",
        }),
      };
    }

    await User.remove(user);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Registro eliminado correctamente",
      }),
    };
  } catch (e) {
    return customException(e);
  }
}
