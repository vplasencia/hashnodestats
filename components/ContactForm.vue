<template>
  <div class="flex items-center justify-center my-5 py-5">
    <form
      id="contact-form"
      class="space-y-5"
      @submit.prevent="sendEmail()"
      novalidate
    >
      <div class="space-y-2">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          class="
            h-12
            px-3
            w-full
            border-2
            rounded-lg
            focus:outline-none
            input-default
          "
        />
        <div id="name-error-message" class="error-text hidden">
          Please enter your name!
        </div>
      </div>
      <div class="space-y-2">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="
            h-12
            px-3
            w-full
            border-2
            rounded-lg
            focus:outline-none
            input-default
          "
        />
        <div id="email-error-message" class="error-text hidden">
          Please enter your email!
        </div>
      </div>
      <div class="space-y-2">
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          class="
            h-40
            p-3
            w-full
            border-2
            rounded-lg
            focus:outline-none
            input-default
          "
        ></textarea>
        <div id="message-error-message" class="error-text hidden">
          Please enter your message!
        </div>
      </div>
      <div class="space-y-2 flex items-center justify-center">
        <button id="send-btn" type="submit" class="send-btn">
          <div v-show="sendingEmail" class="mr-3">
            <BtnLoader />
          </div>
          <span>Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-send"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="flex place-content-center">
        <div id="successfully-sended" class="space-x-1 text-green-600 hidden">
          <span>Sent successfully</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-check"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div id="error-send" class="space-x-1 text-red-600 hidden">
          <span>Send failed</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendingEmail: false,
    };
  },
  mounted() {
    this.sendingEmail = false;
    let name = document.getElementById("name");
    name.addEventListener("focus", (e) => {
      if (name.classList.contains("input-error")) {
        name.classList.remove("input-error");
        name.classList.add("input-default");
        document.getElementById("name-error-message").classList.add("hidden");
      }
    });
    let email = document.getElementById("email");
    email.addEventListener("focus", (e) => {
      if (email.classList.contains("input-error")) {
        email.classList.remove("input-error");
        email.classList.add("input-default");
        document.getElementById("email-error-message").classList.add("hidden");
      }
    });
    let message = document.getElementById("message");
    message.addEventListener("focus", (e) => {
      if (message.classList.contains("input-error")) {
        message.classList.remove("input-error");
        message.classList.add("input-default");
        document
          .getElementById("message-error-message")
          .classList.add("hidden");
      }
    });
  },
  methods: {
    sendEmail() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let message = document.getElementById("message").value;

      if (name === "") {
        document
          .getElementById("name-error-message")
          .classList.remove("hidden");
        document.getElementById("name").classList.remove("input-default");
        document.getElementById("name").classList.add("input-error");
      }

      if (email === "") {
        document
          .getElementById("email-error-message")
          .classList.remove("hidden");
        document.getElementById("email").classList.remove("input-default");
        document.getElementById("email").classList.add("input-error");
      }

      if (message === "") {
        document
          .getElementById("message-error-message")
          .classList.remove("hidden");
        document.getElementById("message").classList.remove("input-default");
        document.getElementById("message").classList.add("input-error");
      }

      if (name === "" || email === "" || message === "") {
        return;
      }

      document.getElementById("send-btn").disabled = true;
      document.getElementById("send-btn").classList.add("cursor-not-allowed");
      this.sendingEmail = true;

      email = email.toLowerCase();

      Email.send({
        Host: process.env.HOST,
        Username: process.env.USERNAME,
        Password: process.env.PASSWORD,
        To: process.env.EMAIL,
        From: process.env.EMAIL,
        Subject: name + " sent you a message from " + email,
        Body: message,
      }).then((res) => {
        // alert(message);
        if (res === "OK") {
          // successfullySended.style.display = "block";
          // setTimeout(function () {
          //   successfullySended.style.display = "none";
          // }, 2000);
          // console.log("Message sent");
          document.getElementById("send-btn").disabled = false;
          document
            .getElementById("send-btn")
            .classList.remove("cursor-not-allowed");
          this.sendingEmail = false;
          let successfullySended = document.getElementById(
            "successfully-sended"
          );
          successfullySended.classList.remove("hidden");
          successfullySended.classList.add("flex");
          setTimeout(function () {
            successfullySended.classList.remove("flex");
            successfullySended.classList.add("hidden");
          }, 2000);
        } else {
          // errorSend.style.display = "block";
          // setTimeout(function () {
          //   errorSend.style.display = "none";
          // }, 2000);
          console.log("An error ocurred while sending the email");
          document.getElementById("send-btn").disabled = false;
          document
            .getElementById("send-btn")
            .classList.remove("cursor-not-allowed");
          this.sendingEmail = false;
          let errorSend = document.getElementById("error-send");
          errorSend.classList.remove("hidden");
          errorSend.classList.add("flex");
          setTimeout(function () {
            errorSend.classList.remove("flex");
            errorSend.classList.add("hidden");
          }, 2000);
        }
        document.getElementById("contact-form").reset();
      });
    },
  },
};
</script>

<style scoped>
.send-btn {
  @apply rounded-lg
          border-2 border-purple-600
          py-3
          px-5
        bg-purple-600
          transition-colors
        text-white
          flex
          space-x-2
          font-semibold
          hover:bg-purple-700;
}

.error-text {
  @apply text-red-500 text-sm mt-1;
}

.input-default {
  @apply border-purple-400 focus:border-purple-600;
}

.input-error {
  @apply border-red-500;
}
</style>