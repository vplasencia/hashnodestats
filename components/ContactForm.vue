<template>
  <div class="flex items-center justify-center my-5 py-5">
    <form id="contact-form" class="space-y-5" @submit.prevent="sendEmail()" novalidate>
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
            border-purple-400 border-2
            rounded-lg
            focus:outline-none focus:border-purple-600
          "
        />
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
            border-purple-400 border-2
            rounded-lg
            focus:outline-none focus:border-purple-600
          "
        />
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
            border-purple-400 border-2
            rounded-lg
            focus:outline-none focus:border-purple-600
          "
        ></textarea>
      </div>
      <div class="space-y-2 flex items-center justify-center">
        <button type="submit" class="send-btn">
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
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    sendEmail() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let message = document.getElementById("message").value;

      console.log(name,email,message);

      console.log(process.env.EMAIL)

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
          console.log("Message sent");
        } else {
          // errorSend.style.display = "block";
          // setTimeout(function () {
          //   errorSend.style.display = "none";
          // }, 2000);
          console.log("An error ocurred while sending the email", res);
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
          hover:bg-transparent
          hover:text-purple-600;
}
</style>