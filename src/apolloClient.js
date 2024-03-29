import { HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";


const httpLink = new HttpLink({
  uri: "https://app-server-production-f093.up.railway.app/",
});

const authLink =  setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers:{
            ...headers,
            authorization: token ? `${token}`: ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client;