import { gql } from '@apollo/client';

export const GET_FEEDBACKS__SUBSCRIPTION = gql`
    subscription PostCreated {
        feedbackCreated {
            ID
            category
            comments {
                ID
                content
                replies {
                    replyingTo
                }
            }
            description
            status
            title
            upVotes
        }
    }
`;

export const GET_FEEDBACK__SUBSCRIPTION = gql`
    subscription($id: String!) {
        feedbackUpdated(id: $id) {
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

/**
 * ID
            category
            comments {}
            
            description
            status
            title
            upVotes
 * subscription {
        feedbacks {
            ID
            category
            comments {
                ID
                content
                replies {
                    replyingTo
                }
            }
            description
            status
            title
            upVotes
        }
    }
 */