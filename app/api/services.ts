export const getPosts = async function () {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async function () {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostComments = async function (post_id: string) {
  try {
    const response = await fetch(
      `https://gorest.co.in/public/v2/posts/${post_id}/comments`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async function (id: string) {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// export const getUsersByIds = async function (userIds: string[]) {
//   const userRequests = userIds.map((id) => getUser(id));
//   const userResponses = await Promise.all(userRequests);
//   return userResponses;
// };
