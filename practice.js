const groupedMessages = {
  "2025-08-06": [
    {
      completedAt: "2025-08-06T06:30:01.000Z",
      createdAt: "2025-08-06T06:30:00.000Z",
      from: "919937320320",
      id: "6895e1aaf9b721133cebadf5",
      message: "Hi, I’d like to know more about your services.",
      meta_msg_id:
        "wamid.HBgMOTE5OT1Y3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA=",
      name: "Ravi Kumar",
      startedAt: "2025-08-06T06:30:00.000Z",
      status: "sent",
      timestamp: "Tue Aug 05 2025 18:50:00 GMT+0530 (India Standard Time)",
      to: "918329446654",
      updatedAt: "2025-08-06T06:30:00.000Z",
      wa_id: "919937320320",
    },
    {
      completedAt: "2025-08-06T06:30:01.000Z",
      createdAt: "2025-08-06T06:30:00.000Z",
      from: "919937320320",
      id: "6895e1aaf9b721133cebadf5",
      message: "Hi, I’d like to know more about your services.",
      meta_msg_id:
        "wamid.HBgMOTE5OT1Y3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA=",
      name: "Ravi Kumar",
      startedAt: "2025-08-06T06:30:00.000Z",
      status: "sent",
      timestamp: "Tue Aug 05 2025 18:50:00 GMT+0530 (India Standard Time)",
      to: "918329446654",
      updatedAt: "2025-08-06T06:30:00.000Z",
      wa_id: "919937320320",
    },
    {
      completedAt: "2025-08-06T06:30:21.000Z",
      createdAt: "2025-08-06T06:30:20.000Z",
      from: "918329446654",
      id: "68956e80dbbba2c15aa629c7",
      message:
        "Hi Ravi! Sure, I’d be happy to help you with that. Could you tell me what you're looking for?",
      meta_msg_id:
        "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggNDc4NzZBQ0YxMjdCQ0VFOTk2NzA3MTI4RkZCNjYyMjc=",
      name: "Ravi Kumar",
      startedAt: "2025-08-06T06:30:20.000Z",
      status: "read",
      timestamp: "Tue Aug 05 2025 18:50:20 GMT+0530 (India Standard Time)",
      to: "919937320320",
      updatedAt: "2025-08-09T05:48:06.737Z",
      wa_id: "919937320320",
    },
  ],
  "2025-08-09": [
    {
      createdAt: "2025-08-09T05:48:48.369Z",
      from: "918329446654",
      id: "6896e140bad76e9210afd0a5",
      message: "Hey Ravi, Now working fine.....",
      status: "sent",
      timestamp: "Sat Aug 09 2025 11:18:05 GMT+0530 (India Standard Time)",
      to: "919937320320",
      updatedAt: "2025-08-09T05:48:48.369Z",
      wa_id: "919937320320",
    },
    {
      createdAt: "2025-08-09T05:48:30.922Z",
      from: "918329446654",
      id: "6896e12ebad76e9210afd0a0",
      message: "message2",
      status: "sent",
      timestamp: "Sat Aug 09 2025 11:18:05 GMT+0530 (India Standard Time)",
      to: "919937320320",
      updatedAt: "2025-08-09T05:48:30.922Z",
      wa_id: "919937320320",
    },
    {
      createdAt: "2025-08-09T05:48:17.285Z",
      from: "918329446654",
      id: "6896e121bad76e9210afd09b",
      message: "message1",
      status: "sent",
      timestamp: "Sat Aug 09 2025 11:18:05 GMT+0530 (India Standard Time)",
      to: "919937320320",
      updatedAt: "2025-08-09T05:48:17.285Z",
      wa_id: "919937320320",
    },
  ],
};

// Convert to one single array
const allMessages = Object.values(rawData).flat();

// console.log(allMessages);

Object.keys(groupedMessages).map((v1,i,arr)=>{
    groupedMessages[v1].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
})


console.log(groupedMessages)