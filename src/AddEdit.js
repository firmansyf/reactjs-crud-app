import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { uid } from "uid";

function AddEdit({
  show,
  setShow,
  formData,
  setFormData,
  isData,
  setIsData,
  guid,
}) {
  const isID = uid();
  const handleClose = () => setShow(false);

  const onChange = (e) => {
    // Ambil Value Form
    let res = { ...formData };
    res[e.target.name] = e.target.value;
    setFormData(res);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let result = [...isData];
    if (guid) {
      // Untuk Edit Data
      isData?.forEach((item) => {
        if (item?.id === guid) {
          item.name = formData.name;
          item.email = formData.email;
          item.no_phone = formData.no_phone;
          item.gender = formData.gender;
        }
      });
    } else {
      // Untuk Add Data
      result.push({
        id: isID,
        name: formData.name,
        email: formData.email,
        no_phone: formData.no_phone,
        gender: formData.gender,
      });
    }

    setIsData(result);
    setFormData({ name: "", email: "", no_phone: "", gender: "" });
    setShow(false);
  };

  useEffect(() => {
    // Handle Click Edit Action
    if (guid) {
      let data = [...isData];
      const result = data.find((item) => item?.id === guid);
      setFormData({
        name: result?.name,
        email: result?.email,
        no_phone: result?.no_phone,
        gender: result?.gender,
      });
    } else {
      setFormData({ name: "", email: "", no_phone: "", gender: "" });
    }
  }, [guid, isData]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleOnSubmit}>
          <Modal.Header closeBtton>
            <Modal.Title>{guid ? `Edit Data` : `Add New Data`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Phone Number"
                  name="no_phone"
                  value={formData.no_phone}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Gender</label>
                <select
                  className="form-select form-select-sm"
                  name="gender"
                  onChange={onChange}
                  value={formData.gender}
                >
                  <option value="">Choose Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddEdit;
