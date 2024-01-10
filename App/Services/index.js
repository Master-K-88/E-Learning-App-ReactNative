import { request, gql } from 'graphql-request';
const MASTER_URL = "https://api-eu-west-2.hygraph.com/v2/clq9u1e8gfvu701ui0ljsc7lb/master";

export const getCourseList = async (level) => {
    const query = gql `
    query CourseList {
        courses(where: {level: `+level+`}) {
          id
          courseName
          price
          level
          tag
          time
          author
          description {
            markdown
          }
          banner {
            url
          }
          chapters {
            id
            title
            content {
              heading
              description {
                markdown
                html
              }
              output {
                markdown
                html
              }
            }
          }
        }
      }
    `

    const result = await request(MASTER_URL, query);
    return result;
}

export const enrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
  mutation MyMutation {
    createUserEnrolledCourse(
      data: {courseId: "`+courseId+`", userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: [PUBLISHED]) {
      edges {
        node {
          id
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const getUserEnrolledCourse = async (courseId, userEmail) => {
  const query = gql `
  query GetUserEnrolledCourse {
    userEnrolledCourses(where: {courseId: "`+courseId+`", userEmail: "`+userEmail+`"}) {
      id
      courseId
      completedChapter {
        chapterId
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const updateCompletedCourses = async (chapterId, courseId, userEmail, points) => {
  const mutationQuery = gql`
  mutation UpdateCompletedCourses {
    updateUserEnrolledCourse(
      data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
      where: {id: "`+courseId+`"}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }

    updateUserDetail(where: {email: "`+userEmail+`"}, data: {point: `+points+`}) {
      point
    }
    publishUserDetail(where: {email: "`+userEmail+`"}) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const createNewUser = async (userName, email, profileImageUrl) => {
  const mutationQuery = gql`
  mutation CreateNewUser {
    upsertUserDetail(
      upsert: {create: 
        {email: "`+email+`", 
        point: 10, 
        profileImage: "`+profileImageUrl+`", 
        userName: "`+userName+`"}, 
      update: {email: "`+email+`", 
      profileImage: "`+profileImageUrl+`", 
      userName: "`+userName+`"}}
      where: {email: "`+email+`"}
    ) {
      id
    }
    publishUserDetail(where: {email: "`+email+`"}) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const getUserDetail = async (userEmail) => {
  const query = gql `
  query GetUserDetails {
    userDetail(where: {email: "`+userEmail+`"}) {
      point
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export const GetAllUsers = async () => {
  const query = gql`
  query GetAllUsers {
    userDetails(orderBy: point_DESC) {
      id
      profileImage
      userName
      point
    }
  }
  `

  const result = await request(MASTER_URL, query)
  return result
}

export const getAllUserEnrolledCourse = async (userEmail) => {
  const query = gql `
  query GetAllUserEnrolledCourse {
    userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
      completedChapter {
        chapterId
      }
      course {
        banner {
          url
        }
        chapters {
          id
          title
          content {
            heading
            description {
              markdown
              html
            }
            output {
              markdown
              html
            }
          }
        }
        description {
          markdown
        }
        id
        level
        courseName
        price
        time
      }
    }
  }
  `

  const result = await request(MASTER_URL, query)
  return result
}