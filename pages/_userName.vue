<template>
  <div class="min-h-screen">
    <div class="mx-2 md:mx-5 my-10 flex items-center justify-between">
      <NuxtLink to="/" class="btn">
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
          class="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Go Home</span>
      </NuxtLink>
      <div v-if="user && user.username">
        <ShareSocialMedia />
      </div>
    </div>
    <div v-if="user && !user.username" class="flex justify-center items-center">
      <span>Invalid Hashnode Username</span>
    </div>
    <div v-if="user && user.username">
      <div id="user-profile" class="grid place-items-center gap-10">
        <div class="img-profile-wrapper">
          <ChartPreloader v-if="!user" />
          <img
            id="image-profile"
            v-if="user.photo"
            data-sizes="auto"
            loading="lazy"
            :src="
              user.photo +
              '?w=400&amp;h=400&amp;fit=crop&amp;crop=faces&amp;auto=compress'
            "
            :data-src="
              user.photo +
              '?w=400&amp;h=400&amp;fit=crop&amp;crop=faces&amp;auto=compress'
            "
            :alt="user.name + 'photo'"
            class="img-profile"
          />
        </div>

        <div class="content-center">
          <div class="font-semibold text-lg">
            {{ user.name }}
          </div>
          <div>
            <a
              id="blog-link"
              :href="
                user.publicationDomain !== null && user.publicationDomain !== ''
                  ? 'http://' + user.publicationDomain
                  : user.publicationDomain === null
                  ? 'https://hashnode.com/@' + user.username
                  : 'https://' + user.username + '.hashnode.dev/'
              "
              target="_blank"
              rel="noreferrer noopener nofollow"
              class="text-purple-600 hover:underline hover:text-purple-700"
              >@{{ user.username }}</a
            >
          </div>
        </div>

        <div
          v-if="
            user.socialMedia.twitter ||
            user.socialMedia.github ||
            user.socialMedia.linkedin ||
            user.socialMedia.facebook ||
            user.socialMedia.website
          "
          class="flex justify-center items-center space-x-5 space-y-2"
        >
          <a
            v-if="user.socialMedia.twitter"
            :href="user.socialMedia.twitter"
            target="_blank"
            rel="noreferrer noopener nofollow"
            data-title="false"
            class="social-media-link"
          >
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
              class="feather feather-twitter"
            >
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              ></path>
            </svg>
          </a>
          <a
            v-if="user.socialMedia.github"
            :href="user.socialMedia.github"
            target="_blank"
            rel="noreferrer noopener nofollow"
            data-title="false"
            class="social-media-link"
          >
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
              class="feather feather-github"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
          </a>
          <a
            v-if="user.socialMedia.linkedin"
            :href="user.socialMedia.linkedin"
            target="_blank"
            rel="noreferrer noopener nofollow"
            data-title="false"
            class="social-media-link"
          >
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
              class="feather feather-linkedin"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            v-if="user.socialMedia.facebook"
            :href="user.socialMedia.facebook"
            target="_blank"
            rel="noreferrer noopener nofollow"
            data-title="false"
            class="social-media-link"
          >
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
              class="feather feather-facebook"
            >
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              ></path>
            </svg>
          </a>
          <a
            v-if="user.socialMedia.website"
            :href="user.socialMedia.website"
            target="_blank"
            rel="noreferrer noopener nofollow"
            data-title="false"
            class="social-media-link"
          >
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
              class="feather feather-external-link"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
      <div class="mt-10">
        <Charts :user="user" :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import * as graphqlQueries from "~/assets/js/graphql-query.js";
// const GET_USER_ARTICLES = `
//     query GetUserArticles($page: Int!) {
//         user(username: "victoria") {
//             publication {
//                 posts(page: $page) {
//                     title
//                     brief
//                     slug
//                 }
//             }
//         }
//     }
// `;

const GET_USER_ARTICLES = gql`
  query GetUserArticles($page: Int!, $userName: String!) {
    user(username: $userName) {
      publication {
        posts(page: $page) {
          title
          brief
          slug
        }
      }
    }
  }
`;

export default {
  // async asyncData({params}) {
  //   let totalPosts = [];
  //   let postCount = 0;
  //   let page = 0;
  //   while (true) {
  //     let response = await graphqlQueries.gqlQuery(GET_USER_ARTICLES.loc.source.body, {
  //       page: page,
  //       userName: params.userName
  //     });
  //     let posts = response.data.user.publication.posts;
  //     postCount = posts.length;
  //     if (postCount > 0) {
  //       totalPosts = totalPosts.concat(posts);
  //       page += 1;
  //     } else break;
  //   }
  //   console.log("totalPosts", totalPosts);
  //   totalPosts.forEach((post) => {
  //     console.log(post);
  //   });

  //   return { totalPosts };
  // },
  apollo: {
    user: {
      query: gql`
        query userInfo($userName: String!) {
          user(username: $userName) {
            publicationDomain
            numFollowing
            numFollowers
            photo
            name
            username
            dateJoined
            numReactions
            socialMedia {
              twitter
              github
              linkedin
              website
              facebook
            }
          }
        }
      `,
      prefetch: ({ route }) => ({ userName: route.params.userName }),
      variables() {
        return { userName: this.$route.params.userName };
      },
    },
  },
  head() {
    return {
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Hashnode Stats",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Hashnode Stats",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://hashnodestats.netlify.app/social-media.png",
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "Hashnode Stats",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Hashnode Stats",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Hashnode Stats",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://hashnodestats.netlify.app/social-media.png",
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: "https://hashnodestats.netlify.app/social-media.png",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "Hashnode Stats",
        },
      ],
    };
  },
  data() {
    return {
      userName: null,
      posts: null,
    };
  },
  async mounted() {
    this.userName = this.$route.params.userName;
    // let totalPosts = [];
    // let postCount = 0;
    // let page = 0;
    // while (true) {
    //   let response = await graphqlQueries.gqlQuery(
    //     GET_USER_ARTICLES.loc.source.body,
    //     {
    //       page: page,
    //       userName: this.userName,
    //     }
    //   );
    //   let posts = response.data.user.publication.posts;
    //   postCount = posts.length;
    //   if (postCount > 0) {
    //     totalPosts = totalPosts.concat(posts);
    //     page += 1;
    //   } else break;
    // }
    // // console.log("totalPosts", totalPosts);
    // // totalPosts.forEach((post) => {
    // //   console.log(post);
    // // });
    // this.posts = totalPosts;
  },
  methods: {
    async gqlQuery(query, variables = {}) {
      const data = await fetch("https://api.hashnode.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return data.json();
    },
  },
};
</script>

<style scoped>
.btn {
  @apply flex space-x-1 w-max rounded-lg border-2 border-purple-600 text-purple-600 py-3 px-5 hover:bg-purple-600 transition-colors hover:text-white font-semibold;
}
.img-profile-wrapper {
  @apply w-32 h-32 bg-gray-100 border-4 border-white rounded-full shadow-md lg:w-48 lg:h-48;
}
.img-profile {
  @apply block w-full rounded-full relative;
}

.social-media-link {
  @apply p-3 hover:bg-purple-100 rounded-lg text-purple-500 transition-colors;
}
</style>