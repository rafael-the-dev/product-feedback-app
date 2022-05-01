import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type User {
        image: String
        name: String!
        username: String!
    }

    type CommentReply {
        content: String! 
        replyingTo: String!
        user: User!
    }

    type Comment {
        id: String!
        content: String!
        commentReplies: [CommentReply!]
        user: User!
    }

    type Feedback {
        ID: String!
        category: String!
        comments: [Comment!]
        description: String!
        status: String!
        title: String!
        upVotes: Number!
    }
`;