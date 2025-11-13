import axios from 'axios';

// Use Vite env var when provided, otherwise default to localhost in dev
const BASE_URI = 'https://motivatemebackend.onrender.com'

export const regiUser = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URI}/api/auth/register`, formData);
    return res.data;
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
  }
};


export const logUser= async(formData)=>{
  try {
    const res= await axios.post(`${BASE_URI}/api/auth/login`, formData)
    return res.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    
  }
}

export const fetchAllPost= async()=>{
  try {
    const res=await axios.get(`${BASE_URI}/api/post/`)
    return res.data
  } catch (error) {
        console.error('Error during fetching:', error.response?.data || error.message);
    
  }
}


export const likePost = async (id, token) => {
  try {
    const res = await axios.put(
      `${BASE_URI}/api/post/${id}/like`,
      {}, // no body needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
        },
      }
    );
    return res.data; // updated post with new likes
  } catch (error) {
    console.error("Failed to like post:", error);
    throw error;
  }
};

export const addComment = async (id, content, token) => {
  const res = await axios.put(
    `${BASE_URI}/api/post/${id}/comment`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const createPost = async (post, token) => {
  try {
    const res = await axios.post(
      `${BASE_URI}/api/post/create`,
      post, // { title, content, etc. }
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // return the created post or API response
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};
export const getProfile = async (token) => {
  try {
    const res = await axios.get(`${BASE_URI}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // send JWT token
      },
    });

    return res.data; // { user: {...} }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};