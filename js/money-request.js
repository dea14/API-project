const postBtn1 = document.getElementById("post-btn1");
const postBtn2 = document.getElementById("post-btn2");
const postBtn3 = document.getElementById("post-btn3");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const f = makeid(5);

const sendMoneyRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader(
      "accessToken",
      "Bearer 3dd2360f-147d-4f0d-8ce5-b0c264f8ff4e"
    );
    xhr.setRequestHeader("thirdPartyAccessId", "CA1TAwc9K4ukPTBM");
    xhr.setRequestHeader("requestId", f);
    xhr.setRequestHeader("deviceId", "dev");
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

const sendData = amt => {
  sendMoneyRequest(
    "POST",
    "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",

    {
      referenceNumber: "string",
      sourceMoneyRequestId: f,
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
      amount: amt,
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
      window.location.href = responseData.paymentGatewayUrl;
    })

    .catch(err => {
      console.log(err);
    });
};

/* postBtn1.addEventListener("click", e => sendData(5)); */

postBtn1.addEventListener("click", sendData.bind(this, 5));
postBtn2.addEventListener("click", sendData.bind(this, 10));
postBtn3.addEventListener("click", sendData.bind(this, 15));

/* postBtn2.addEventListener("click", sendData(10));

postBtn3.addEventListener("click", sendData(15));
 */
