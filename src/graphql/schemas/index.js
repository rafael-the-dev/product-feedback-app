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
        upVotes: Int!
    }

    type Query {
        feedbacks: [Feedback!]!
        feedback(id: String): Feedback!
    }

    
    input UserInput {
        image: String
        name: String!
        username: String!
    }

    input CommentReplyInput {
        content: String! 
        replyingTo: String!
        user: UserInput!
    }

    input CommentInput {
        content: String!
        replies: [CommentReplyInput]!
        user: UserInput!
    }

    input FeedbackInput {
        category: String!
        description: String!
        status: String!
        title: String!
        upVotes: Int!
    }

    type Mutation {
        addFeedback(feedback: FeedbackInput!): Feedback
    }
`;