import { useEffect, useState } from "react";
import api from "../axiosService";
import { Link } from "react-router-dom";
import NProgress from "nprogress";

const UserActivate = () => {

const GetUserList= async()=>{
api.get("/user/UserList"
    //   ,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  ).then(res => {
      //alert(JSON.stringify(res.data));
      setDataList(res.data);      
    })
    .catch(() => setDataList([]));  
};

 const [dataList, setDataList] = useState([]);

    useEffect( ()=>
    {
    NProgress.start();
    api.get("/user/UserList"
    //   ,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  ).then(res => {
      
      setDataList(res.data);      
    })
    .catch(() => setDataList([])).finally(()=>{ NProgress.done();  });  
  },[]);


  const activateUser = async (userId) => {
  try {
    alert(userId);
    await api.put(`/user/activate/${userId}`);
    alert('User activated successfully');
    // Optionally refresh the grid
  } catch (err) {
    console.error(err);
    alert('Error activating user');
  }
};


//   useEffect(() => {
//     api.get('https://localhost:7030/api/inactive-users-with-roles') // Update URL as needed
//       .then(res => setUsers(res.data))
//       .catch(err => console.error(err));
//   }, []);

  return (
    <div className="p-4">
  <h2 className="text-xl font-bold mb-4">Users List</h2>

  <div className="w-full overflow-x-auto rounded-lg shadow">
    <table className="table table-zebra w-full text-sm">
      <thead className="bg-base-200 text-sm">
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>University</th>
          <th>Roles</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dataList.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">No Record found</td>
          </tr>
        ) : (
          dataList.map((user, index) => (
            <tr key={user.Id}>
              <td>{index + 1}</td>
              <td className="whitespace-nowrap">{user.FirstName} {user.LastName}</td>
              <td className="break-all">{user.Email}</td>
              <td className="whitespace-nowrap">{user.UniversityName}</td>
              <td>
                {user.Roles?.map((role, i) => (
                  <span key={i} className="badge badge-outline badge-sm mr-1 mb-1">{role}</span>
                ))}
              </td>
              <td>
                {user.IsActive === false ? (
                  <button onClick={() => activateUser(user.Id)} className="btn btn-sm btn-primary">
                    Activate
                  </button>
                ) : (
                  <span className="text-success font-medium">Active</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  <div className="mt-4">
    <Link to="/adashboard">
      <button className="btn btn-neutral">Back</button>
    </Link>
  </div>
</div>

  )
}

export default UserActivate
