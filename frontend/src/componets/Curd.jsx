import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import moment from 'moment';

export const Curd = () => {
    const [show, setShow] = useState(false);
    const [user, setuser] = useState(
        {
            name: "",
            email: "",
            mobile: "",
            DOB: "",
            gender: ""
        })
    const [stuData, setStuData] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value })
    }

    const handleSubmit = async () => {
        if (editIndex !== null) {
            try {
                const res = await axios.put(`http://localhost:1000/api/${editIndex}`, user)
                // console.log(res);
                toast.success(res.data.message)
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        } else {
            try {
                const res = await axios.post('http://localhost:1000/api/', user)
                toast.success(res.data.message)
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        }
        setuser({
            name: "",
            email: "",
            mobile: "",
            DOB: "",
            gender: ""
        })
        setEditIndex(null);
        get_Data()
        setShow(false);
    }

    const get_Data = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/`,)
            setStuData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:1000/api/${id}`)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        get_Data()
    }

    const handleEdit = async (id, item) => {
        setShow(true);
        setEditIndex(id)
        setuser(item)
    }


    const handleClose = () => {
        setShow(false)
        setuser({
            name: "",
            email: "",
            mobile: "",
            DOB: "",
            gender: ""
        })
        setEditIndex(null);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        get_Data()
    }, [])

    return (
        <>

            <div className="container mt-5">
                <div className='d-flex justify-content-end my-3'>
                    <button className='btn btn-primary d-flex align-items-center' onClick={handleShow}>  <FaPlus className='me-2' /> Add Student</button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{editIndex !== null ? "Update Student Data" : "Add New Student"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' value={user.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' value={user.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile No</label>
                                <input type="tel" className="form-control" name='mobile' value={user.mobile} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">D.O.B</label>
                                <input type="date" className="form-control" name='DOB' value={user.DOB} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select className="form-select" aria-label="Default select example" name='gender' value={user.gender} onChange={handleChange}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                {editIndex !== null ? 'Update' : 'Submit'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <Table striped bordered hover size="sm">
                    <thead className='table-dark'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>D.O.B</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stuData?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{moment(item.DOB).format('DD-MM-YYYY')}</td>
                                <td>{item.gender}</td>
                                <td className='d-flex justify-content-evenly p-2'>
                                    <FaEdit className='text-secondary' onClick={() => handleEdit(item._id, item)} />
                                    <MdDelete className='text-danger' onClick={() => handleDelete(item._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}