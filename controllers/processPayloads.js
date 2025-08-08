const fs = require("fs");
const path = require("path");
const Message = require("../models/Message.model");
const User = require("../models/User.model");

function parseToDate(str) {
  return new Date(str.replace(" ", "T"));
}

const processPayloads = async () => {
  const payloadDir = path.join(__dirname, "../payloads");
  const files = fs.readdirSync(payloadDir);

  for (const file of files) {
    const filePath = path.join(payloadDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);

    // console.log("createdAt",json.createdAt)
    // console.log("updatedAt",json.startedAt)
    // const messages = json.metaData.entry[0].changes[0].value.messages;
    // console.log(messages)

    // Get entries from payload
    const entries = json.metaData?.entry || [];

    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const value = change.value;

        // Handle incoming messages
        if (value.messages && Array.isArray(value.messages)) {
          const contacts = value.contacts || [];

          for (const msg of value.messages) {
            const wa_id = contacts?.[0]?.wa_id || "unknown";
            const name = contacts?.[0]?.profile?.name || "Unknown";

            try {
              const existing = await Message.findOne({ meta_msg_id: msg.id });
              if (!existing) {
                // Determine "to" based on whether the message is incoming or outgoing
                const systemPhoneNumber = value.metadata?.display_phone_number;
                const isOutgoing = msg.from === systemPhoneNumber;

                const from = msg.from;
                const to = isOutgoing ? wa_id : systemPhoneNumber;

                const newMsg = new Message({
                  wa_id,
                  name,
                  from,
                  to,
                  message: msg.text?.body || "",
                  timestamp: new Date(Number(msg.timestamp) * 1000),
                  meta_msg_id: msg.id,
                  createdAt: parseToDate(json.createdAt),
                  startedAt: parseToDate(json.startedAt),
                  completedAt: parseToDate(json.completedAt),
                });

                const response = await newMsg.save();
                // console.log(`Inserted message: ${msg.id}`);
              }
            } catch (error) {
              console.log("Error while inserting or checking message", error);
            }
          }

          for (const c of contacts) {
            try {
              const exists = await User.findOne({ wa_id: c.wa_id });
              if (!exists) {
                const newUser = await User({
                  wa_id: c.wa_id,
                  name: c.profile.name,
                });
                const response = await newUser.save();
                // console.log(
                //   `User Added: ${c.wa_id} and response is ${response}`
                // );
              }
            } catch (error) {
              console.log("Error occured while adding user : ", error);
            }
          }
        }

        // Handle status updates
        if (value.statuses && Array.isArray(value.statuses)) {
          for (const status of value.statuses) {
            try {
              const updated = await Message.findOneAndUpdate(
                { meta_msg_id: status.id },
                { status: status.status },
                { new: true }
              );
              if (updated) {
                // console.log(
                //   `Updated status for ${status.id} to ${status.status}`
                // );
              }
            } catch (error) {
              console.log(`Error while updating the status : ${error}`);
            }
          }
        }
      }
    }
  }
};

module.exports = processPayloads;
