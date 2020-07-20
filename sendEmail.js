import * as uuid from "uuid";
import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export async function main(event, context, callback) {
  const { message, name, email } = JSON.parse(event.body);

  const invalidRequest =
    typeof message !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string";

  if (invalidRequest) {
    callback(new Error("Invalid arguments in the event."));

    return;
  }

  const params = {
    Destination: {
      ToAddresses: email,
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Reaching out from donrayxwilliams.com: ${name}`,
      },
      Body: {
        HTML: {
          Charset: "UTF-8",
          Data: message,
        },
      },
    },
  };

  try {
    let data = await ses.sendEmail(params);
    return success(data);
  } catch (e) {
    return failure(e);
  }
}
