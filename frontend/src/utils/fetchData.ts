import axios from 'axios';

export const fetchData = async (url: string) => {
  console.log(url);
  try {
    const res = await axios.get(url);

    return res?.data?.dataRes;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
