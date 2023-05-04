const userDatas = async (id) => {

    const response = await fetch(`http://127.0.0.1:8000/user/api/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const user = await response.json();
  
    return user
  }
  
  export default userDatas