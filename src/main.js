import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import mitt from "mitt";
import { setContext } from 'apollo-link-context'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


const emitter = mitt();

const httpLink = createHttpLink({
  uri: "https://api-gateway-ecommerce.herokuapp.com/"
});


const authLink = setContext((request, { headers }) => {
  return {
      headers: {
          ...headers,
          'Authorization': localStorage.getItem('access') || ''
      }
  }
})


const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const apolloProvider = new createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app
  .use(router)
  .use(apolloProvider)
  .mount("#app");
