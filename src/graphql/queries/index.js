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