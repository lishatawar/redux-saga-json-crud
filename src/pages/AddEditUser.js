import React, { useEffect, useState } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function App() {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  let { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.filter((item) => item.id === Number(id));
      if(singleUser && singleUser.length>0){
        setFormValue(singleUser[0]);
      }
   }
  }, [id]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User added successfully!");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated!");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const resetForm = () => {
    setFormValue(initialState);
  };

  return (
    <MDBValidation
      className="row g-3"
      onSubmit={handleSubmit}
      style={{ marginTop: "100px" }}
    >
      <p className="fs-2 fw-bold">
        {editMode ? "Update User Details" : "Add User Details"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBValidationItem feedback="Please enter a name." invalid>
          <MDBInput
            value={name}
            name="name"
            onChange={onChange}
            id="validationCustom01"
            required
            label="Name"
            type="text"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter a email." invalid>
          <MDBInput
            value={email}
            name="email"
            onChange={onChange}
            id="validationCustom01"
            required
            label="Email"
            type="email"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter a phone no." invalid>
          <MDBInput
            value={phone}
            name="phone"
            onChange={onChange}
            id="validationCustom01"
            required
            label="Phone"
            type="number"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter an address." invalid>
          <MDBInput
            value={address}
            name="address"
            onChange={onChange}
            id="validationCustom01"
            required
            label="Address"
            type="text"
          />
        </MDBValidationItem>
        <br />
        <div className="col-12">
          <MDBBtn type="submit" className="mx-2">
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn
            type="reset"
            className="mx-2"
            color="secondary"
            onClick={resetForm}
          >
            Reset
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} className="mx-2" color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
}
