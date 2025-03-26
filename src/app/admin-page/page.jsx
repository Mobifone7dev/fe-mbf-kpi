"use client";
<time datetime="2016-10-25" suppressHydrationWarning />;
import { redirect } from "next/navigation";
import SearchHeader from "../../components/widgets/search/SearchHeader";
import {handleGetWebUser} from "../../lib/api";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const [textSearch, setTextSearch] = useState();
  const[searchUsers, setSearchUsers] = useState([]);

  let [adminPageRole, setAdminPageRole] = useState({});
  useEffect(() => {
    try {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      console.log("user", user);
      if (user && user.roles) {
        if (user.roles.find((object) => (object.menu_id = "2"))) {
          setAdminPageRole(user.roles.find((object) => (object.menu_id = "2")));
        }
        console.log("adminPageRole", adminPageRole);
      }
    } catch (error) {
      console.log(error);
      redirect("/login");
    }
  }, []);
  function checkIfEmailInString(text) {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  if (adminPageRole && adminPageRole.SELECT_ROLE && adminPageRole.EDIT_ROLE) {
    return (
      <div>
        <h4>Tìm kiếm user</h4>
        <SearchHeader
          textSearch={textSearch}
          textHolder="Nhập email ..."
          callback={(e) => {
            let newStringEmail ='';
            if (!checkIfEmailInString(e)) {
                newStringEmail = e + "@mobifone.vn";
              }
            handleGetWebUser(newStringEmail).then(async (res)=>{
            const data =  await res.json();
            console.log("data", data)
            if(data &&data.result){
                setSearchUsers(data.result)
            }

            })
          }}
        />
        <div className="table-user mt-2">
        <table className="table table-responsive  align-middle gs-0 gy-3">
          <thead>
            <tr className={`table-head`}>
              <th>Province</th>
              <th>Username</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Thêm quyền menu</th>
            </tr>
          </thead>
          <tbody>
            {
                searchUsers&&searchUsers.length > 0 ? (
                    searchUsers.map((object, index)=>(
                        <tr key={index}>
                        <td>{object&&object["PROVINCE"]}</td>
                        <td>{object&&object["USER_NAME"]}</td>
                        <td>{object&&object["USER_EMAIL"]}</td>
                        <td>{object&&object["STATUS"] ? "Hoạt động": "Không hoạt động"}</td>
                        <td><Button>Thêm quyền menu</Button></td>
                      </tr>
                    ))

                ):null
            }
           
          </tbody>
        </table>

        </div>
        
      </div>
    );
  } else {
    return (
      <>
        <h1 style={{ color: "red", textAlign: "center" }}>
          Bạn không có quyền thực hiện chức năng này
        </h1>
      </>
    );
  }
};
export default Page;
