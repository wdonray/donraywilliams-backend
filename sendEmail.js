import AWS from "aws-sdk";
import handler from "./libs/handler";

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: "us-east-1" });

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: ["donrayxwilliams@gmail.com"],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Reaching out from donrayxwilliams.com: ${data.name}`,
      },
      Body: {
        HTML: {
          Charset: "UTF-8",
          Data: data.message,
        },
      },
    },
    Source: data.email,
  };

  let response = await ses.sendEmail(params);

  return response.httpRequest;
});
