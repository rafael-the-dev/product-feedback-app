import { gql } from '@apollo/client'

export const ADD_COMMENT = gql`
    mutation createComment($comment: CommentInput!) {
        addComment(comment: $comment) {
            ID
        }
    }
`;

export const ADD_REPLY = gql`
    mutation createReply($reply: CommentReplyInput!) {
        addCommentReply(reply: $reply) {
            ID
        }
    }
`;

export const UPVOTE_FEEDBACK = gql`
    mutation UpVoteFeedback($id: String!) {
        upVoteFeedback(id: $id) {
            ID
        }
    }
`;