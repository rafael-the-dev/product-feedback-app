import { gql } from "@apollo/client"

export const GET_FEEDBACKS = gql`
    query getFeedbacks {
        feedbacks {
            ID
            title
            comments {
                ID
                content
                replies {
                    content
                    replyingTo
                    user {
                    name
                    }
                }
            }
        }
    }
`;

export const GET_FEEDBACK = gql`
    query getFeedback($id: String!) {
        feedback(id: $id) {
            ID
            category
            comments {
                ID
                content
                replies {
                    content 
                    replyingTo
                    user {
                        image
                        name
                        username
                    }
                }
                user {
                    image
                    name
                    username
                }
            }
            description
            status
            title
            upVotes
        }
    }
`;