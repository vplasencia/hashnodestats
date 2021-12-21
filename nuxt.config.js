export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Hashnode Stats",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Hashnode Stats"
      },
      {
        name: "format-detection",
        content: "telephone=no"
      },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://hashnodestats.netlify.app/"
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Hashnode Stats"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Hashnode Stats"
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://hashnodestats.netlify.app/social-media.jpg"
      },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Hashnode Stats"
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://hashnodestats.netlify.app/"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Hashnode Stats"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Hashnode Stats"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://hashnodestats.netlify.app/social-media.jpg"
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: "https://hashnodestats.netlify.app/social-media.jpg"
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "Hashnode Stats"
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }],
    script: [{
      src: "https://smtpjs.com/v3/smtp.js",
      async: true,
      defer: true
    }]
  },

  loading: "~/components/Preloader.vue",

  env: {
    HOST: process.env.HOST,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
      src: "~/plugins/apexCharts.js",
      mode: "client"
    } // only on client side
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss"],

  googleFonts: {
    download: true,
    base64: true,
    overwriting: false,
    families: {
      Rubik: [400, 500, 600, 700, 800, 900]
    },
    useStylesheet: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/apollo",
    '@nuxtjs/robots'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "https://api.hashnode.com"
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
      name: "Hashnode Stats",
      short_name: "Hashnode Stats",
      description: "Hashnode Stats",
      theme_color: "#7C3AED"
    },
    icon: {
      fileName: "app-icon.jpg"
    }
  },

  generate: {
    fallback: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
