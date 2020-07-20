import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: ['donrayxwilliams.gmail.com'],
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
    Source: data.email
  };

  ses.sendEmail(params, (err, data) => {
    if (err) callback(null, failure({ status: false }));
    else callback(null, success({ status: true }));
  });
}
