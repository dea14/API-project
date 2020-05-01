const postBtn1 = document.getElementById("post-btn1");
const postBtn2 = document.getElementById("post-btn2");
const postBtn3 = document.getElementById("post-btn3");

const sendMoneyRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader(
      "accessToken",
      "Bearer 3dd2360f-147d-4f0d-8ce5-b0c264f8ff4e"
    );
    xhr.setRequestHeader("thirdPartyAccessId", "CA1TAwc9K4ukPTBM");
    xhr.setRequestHeader("requestId", "noo");
    xhr.setRequestHeader("deviceId", "joo");
    xhr.setRequestHeader("apiRegistrationId", "CA1AR8hzGYrdU5H6");

    xhr.responseType = "json";

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const sendData = () => {
  sendMoneyRequest(
    "POST",
    "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",

    {
      referenceNumber: "string",
      sourceMoneyRequestId: "koo",
      requestedFrom: {
        //"contactId": "string",
        //"contactHash": "string",
        contactName: "Dea",
        language: "en",
        notificationPreferences: [
          {
            handle: "maunikchaudhry75@gmail.com",
            handleType: "email",
            active: true
          }
        ]
      },
      amount: 10,
      currency: "CAD",
      editableFulfillAmount: false,
      requesterMessage: "hi",
      invoice: {
        invoiceNumber: "string",
        dueDate: "2020-07-02T16:12:12.000Z"
      },
      expiryDate: "2020-10-02T16:12:12.000Z",
      supressResponderNotifications: false,
      returnURL: "string",
      creationDate: "2020-07-01T16:12:12.000Z",
      status: 0,
      fulfillAmount: 0,
      responderMessage: "string",
      notificationStatus: 0
    }
  )
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err);
    });
};
if (postBtn1) {
  postBtn1.addEventListener("click", sendData);
} else if (postBtn2) {
  postBtn2.addEventListener("click", sendData);
} else if (postBtn3) {
  postBtn3.addEventListener("click", sendData);
} else {
  return 0;
}
