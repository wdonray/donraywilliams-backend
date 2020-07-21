import AWS from "aws-sdk";
import handler from "./libs/handler";

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: "us-east-1" });

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  // Source - I am sending and getting the email
  // Name - The name of the person creating the email
  // Email - The actual email of the person
  // Message - The message that the person wants to send me

  const params = {
    Destination: {
      ToAddresses: [data.sourceEmail],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `From donrayxwilliams.com: ${data.name} / ${data.email}`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data.message,
        },
      },
    },
    Source: data.sourceEmail,
  };

  await ses.sendEmail(params).promise();

  return data;
});
