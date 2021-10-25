import * as utils from "~/assets/js/utils.js";
import * as buildCharts from "~/assets/js/build-charts.js";
import * as graphqlQueries from "~/assets/js/graphql-query.js";

function solveCharts() {}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!, $username: String!) {
        user(username: $username) {
            publication {
                posts(page: $page) {
                  author{
                    username
                  }
                  dateAdded
                  dateFeatured
                  totalReactions  
                  title
                }
            }
        }
    }
`;

export async function getAllPosts(userName) {
  let totalPosts = [];
  let postCount = 0;
  let page = 0;
  while (true) {
    let response = await graphqlQueries.gqlQuery(GET_USER_ARTICLES, {
      page: page,
      username: userName
    });
    // console.log("result",response.data.user.publication.posts);
    let posts = response.data.user.publication.posts;
    postCount = posts.length;
    if (postCount > 0) {
      totalPosts = totalPosts.concat(posts);
      page += 1;
    } else break;
  }
  return totalPosts;
}

function numberOfPostsPerWeekDay(htmlObjectId, posts) {}
