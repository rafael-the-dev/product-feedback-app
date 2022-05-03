import { gql } from '@apollo/client'

export const ADD_COMMENT = gql`
    mutation createComment($comment: CommentInput!) {
        addComment(comment: $comment) {
            ID
        }
    }
`;