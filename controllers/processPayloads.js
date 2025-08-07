const fs = require("fs");
const path = require("path");
const Message = require("../models/Message");

const processPayloads = async () => {
  const payloadDir = path.join(__dirname, "../payloads");
  const files = fs.readdirSync(payloadDir);

  for (const file of files) {
    const filePath = path.join(payloadDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);

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
            // console.log("Message", msg);
            const wa_id = contacts?.[0]?.wa_id || "unknown";
            const name = contacts?.[0]?.profile?.name || "Unknown";

            try {
              const existing = await Message.findOne({ meta_msg_id: msg.id });
              if (!existing) {
                console.log("I am inside");
                try {
                  const newMsg = new Message({
                    wa_id,
                    name,
                    message: msg.text?.body || "",
                    timestamp: new Date(Number(msg.timestamp) * 1000),
                    meta_msg_id: msg.id,
                  });
                  const response = await newMsg.save();
                  console.log(
                    `Inserted message: ${msg.id} and response is ${response}`
                  );
                } catch (error) {
                  console.log("Error occured while inserting message", error);
                }
              }
            } catch (error) {
              console.log(
                "Error while finding message in the database : ",
                error
              );
            }
          }
        }

        // Handle status updates
         if (value.statuses && Array.isArray(value.statuses)) {
          for (const status of value.statuses) {
            try{
              const updated = await Message.findOneAndUpdate(
                { meta_msg_id: status.id },
                { status: status.status },
                { new: true }
              );
              if (updated) {
                console.log(`Updated status for ${status.id} to ${status.status}`);
              }
            }catch(error) {
              console.log(`Error while updating the status : ${error}`)
            }
          }
        } 
      }
    }
  }
};

module.exports = processPayloads;
