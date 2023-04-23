import { Table } from "react-bootstrap";
import "./App.css";
import { lazy, useState } from "react";

const AddEdit = lazy(() => import("./AddEdit"));

function App() {
  const [showModal, setShowModal] = useState(false);
  const [guid, setGuid] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    no_phone: "",
    gender: "",
  });
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    // Untuk Delete
    let res = [...data];
    const result = res.filter((item) => item.id !== id);
    setData(result);
  };

  return (
    <>
      <div className="App">
        <div className="button-section">
          <button
            className="btn btn-sm text-white"
            onClick={() => {
              setShowModal(true);
              setGuid(undefined);
            }}
          >
            + Add New Data
          </button>
        </div>
        <div className="content-section">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>No. Phone</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data?.map(({ id, name, email, no_phone, gender }, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{no_phone}</td>
                        <td>{gender}</td>
                        <td className="d-flex justify-content-evenly">
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setGuid(id);
                            }}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>

      <AddEdit
        show={showModal}
        setShow={setShowModal}
        formData={formData}
        setFormData={setFormData}
        isData={data}
        setIsData={setData}
        guid={guid}
      />
    </>
  );
}

export default App;
