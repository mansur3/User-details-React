import {useState, useRef, useEffect} from "react";
import {NewEmployee} from "./NewEmployee";
import "./employeeDetails.css";
// import {useState, useRef, useEffect} from "react";

export const EmployeeDetails = () => {
    const [formData, setFormData] = useState({
        name : "",
        age : "",
        address : "",
        department : "",
        salary : "",
        maritial_status : "",
        profile_photo : ""

    });
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const inputRef = useRef();


    const getData = () => {
        fetch(`http://localhost:3001/employee?_page=${page}&_limit=5`).then((d) => d.json()).then(setData);
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetch("http://localhost:3001/employee", {
            method : "POST",
            body : JSON.stringify(formData),
            headers : {
                "Content-Type": "application/json"
            }
        }).then(getData);
    }

        useEffect(() => {
            getData();
        },[page])



    const handleChange = (e) => {
        const file = inputRef.current.files[0];

        const {name, value, checked, type} = e.target;
        setFormData({...formData, [name] : type === "checkbox"? checked : value});
    }


    const handleDelete = (id) => {
        fetch(`http://localhost:3001/employee/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json"
            }
        }).then(getData);
    }

    const handleFilter = (e) =>{
        let department = e.target.value;
        fetch(`http://localhost:3001/employee?department=${department}&_sort=salary&_order=asc`).then((d) => d.json()).then(setData);
    }

return (
    <div className = "container">
        <div className = "table-container">
            {/* <NewEmployee /> */}
            <div>
                <div>
                <select className = "department" onChange = {handleFilter} name = "department">
                    <option value = "Computer science">Computer science</option>
                    <option value = "Mathmatics">Mathmatics</option>
                    <option value = "Chemistry" >Chemistry</option>
                    <option value = "Physics">Physics</option>
                    <option value = "English">English</option>
                    <option value = "History">History</option>
                </select>
                </div>
                <div>
                    <button onClick = {() => {
                        fetch("http://localhost:3001/employee?_sort=salary&_order=asc").then((d) => d.json()).then(setData);
                    }}>Sort salary Ascending</button>
                    <button onClick = {() => {
                        fetch("http://localhost:3001/employee?_sort=salary&_order=desc").then((d) => d.json()).then(setData);
                    }}>Sort salary descending</button>
            </div>
            </div>
            <table className = "table">
                <tr className = "row1">
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>department</th>
                    <th>Salary</th>
                    <th>Maritial status</th>
                    <th>Delete</th>
                </tr>
                { data.map(d => (
                    <tr key = {d.id}>
                        <td>{d.name}</td>
                        <td>{d.age}</td>
                        <td>{d.address}</td>
                        <td>{d.department}</td>
                        <td>{d.salary}</td>
                        <td>{d.unmarried?"unmarried": "married"}</td>
                        <td><button onClick = {() => {
                            handleDelete(d.id);
                        }}>Delete</button></td>
                    </tr>
                ))};
            </table>
            <div class = "paginate">
                <button onClick = {() => {setPage(page - 1)}}>Prev</button>
                <button onClick = {() => {setPage(page + 1)}}>Next</button>
            </div>
               
            
        </div>
        <div className = "form-container">
            <form className = "form" onSubmit = {handleSubmit}>
                <label>Name : </label><br />
                <input className = "name" onChange = {handleChange} type = "text" name = "name" placeholder = "Enter the name" />
                <br/>
                <label>Age</label><br />
                <input className = "age" onChange = {handleChange} type = "number" name = "age" placeholder = "Enter the age" />
                <br />
                <label>Address</label><br />
                <input className = "address" onChange = {handleChange} type = "text" name = "address" placeholder = "Enter the address" />
                <br />
                <label>Department : </label><br />
                <select className = "department" onChange = {handleChange} name = "department">
                    <option value = "Computer science">Computer science</option>
                    <option value = "Mathmatics">Mathmatics</option>
                    <option value = "Chemistry" >Chemistry</option>
                    <option value = "Physics">Physics</option>
                    <option value = "English">English</option>
                    <option value = "History">History</option>
                </select>
                <br />
                <label>Salary</label><br />
                <input className = "salary" onChange = {handleChange} type = "number" name = "salary" placeholder = "Enter the salary" />
                <br />
                <label>Maritial Status : </label><br />
                <br />
               <span className = "married"> Married :</span> <input className = "minput" onChange = {handleChange} type = "checkbox" name = "married" />
               <span className = "unmarried"> Unmarried:</span> <input className = "uninput" onChange = {handleChange} type = "checkbox" name = "unmarried" />
                <br />
                <label>Profile Photo</label><br />
                <input className = "file" onChange = {handleChange} ref = {inputRef} type = "file" name = "photo" />
                <br />
                <input id = "sub" className = "submit" type = "submit" value = "submit" />
            </form>
        </div>
    </div>
)

}