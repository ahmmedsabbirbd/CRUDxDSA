import React, { useState, useEffect } from 'react';

// Main Student Records Component
const StudentRecordsViewer = () => {
    // State for student data and UI
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [recordsPerPage] = useState(10000);

    // State for form handling
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        major: '',
        gpa: 0,
        status: 'Active'
    });
    const [formMode, setFormMode] = useState('create');

    // Generate some sample data
    useEffect(() => {
        const generateData = () => {
            const sampleData = [];
            const statusOptions = ['Active', 'On Leave', 'Graduated', 'Suspended'];
            const majorOptions = ['Computer Science', 'Business', 'Engineering', 'Psychology', 'Biology'];

            for (let i = 0; i < 100000; i++) {
                const firstName = ['John', 'Jane', 'Bob', 'Alice', 'Mike', 'Sarah', 'Tom', 'Emily'][Math.floor(Math.random() * 8)];
                const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'][Math.floor(Math.random() * 8)];

                sampleData.push({
                    id: `S-${String(i + 1).padStart(5, '0')}`,
                    firstName,
                    lastName,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@university.edu`,
                    major: majorOptions[Math.floor(Math.random() * majorOptions.length)],
                    gpa: parseFloat((Math.random() * 3 + 1).toFixed(2)),
                    status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
                });
            }

            setStudents(sampleData);
            setLoading(false);
        };

        generateData();

    }, []);

    console.log(students);

    // Filter students based on search
    const filteredStudents = students.filter(student =>
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current page of students
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);

    // Handle opening the create form
    const handleCreate = () => {
        setFormData({
            id: `S-${String(students.length + 1).padStart(5, '0')}`,
            firstName: '',
            lastName: '',
            email: '',
            major: '',
            gpa: 0,
            status: 'Active'
        });
        setFormMode('create');
        setIsModalOpen(true);
    };

    // Handle opening the edit form
    const handleEdit = (student) => {
        setFormData({ ...student });
        setFormMode('edit');
        setIsModalOpen(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'gpa' ? parseFloat(value) || 0 : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formMode === 'create') {
            setStudents(prev => [...prev, formData]);
        } else {
            setStudents(prev =>
                prev.map(student => student.id === formData.id ? formData : student)
            );

            // Update selected student if it's the one being edited
            if (selectedStudent && selectedStudent.id === formData.id) {
                setSelectedStudent(formData);
            }
        }

        setIsModalOpen(false);
    };

    // Handle deleting a student
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents(prev => prev.filter(student => student.id !== id));

            // Clear selected student if it's the one being deleted
            if (selectedStudent && selectedStudent.id === id) {
                setSelectedStudent(null);
            }
        }
    };

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="text-center p-8 text-xl">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">Student Records</h1>
                    <p className="mt-2">View and manage student information</p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Search and Add Button */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="border p-2 rounded w-full md:w-1/2"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Add New Student
                        </button>
                    </div>
                </div>

                {/* Students Table with Fixed Height */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="overflow-hidden" style={{ height: "500px" }}>
                        <div className="overflow-y-auto h-full">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {currentStudents.length > 0 ? (
                                    currentStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className={`hover:bg-gray-50 ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                                            onClick={() => setSelectedStudent(student === selectedStudent ? null : student)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.firstName} {student.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.major}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{student.gpa.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${student.status === 'Active' ? 'bg-green-100 text-green-800' :
                              student.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                                  student.status === 'Graduated' ? 'bg-blue-100 text-blue-800' :
                                      'bg-red-100 text-red-800'}`}
                          >
                            {student.status}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(student);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(student.id);
                                                    }}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center">No students found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstRecord + 1}</span> to{" "}
                                <span className="font-medium">
                  {Math.min(indexOfLastRecord, filteredStudents.length)}
                </span>{" "}
                                of <span className="font-medium">{filteredStudents.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Previous
                                </button>

                                {Array.from({ length: Math.ceil(filteredStudents.length / recordsPerPage) }).map((_, index) => (
                                    (index + 1 <= 3 || index + 1 >= Math.ceil(filteredStudents.length / recordsPerPage) - 2 || Math.abs(index + 1 - currentPage) <= 1) && (
                                        <button
                                            key={index}
                                            onClick={() => paginate(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border ${
                                                currentPage === index + 1
                                                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } text-sm font-medium`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                ))}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(filteredStudents.length / recordsPerPage)}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === Math.ceil(filteredStudents.length / recordsPerPage)
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Student Details Section */}
                {selectedStudent && (
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">Student Details</h2>
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>ID:</strong> {selectedStudent.id}</p>
                                <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                                <p><strong>Email:</strong> {selectedStudent.email}</p>
                            </div>
                            <div>
                                <p><strong>Major:</strong> {selectedStudent.major}</p>
                                <p><strong>GPA:</strong> {selectedStudent.gpa.toFixed(2)}</p>
                                <p><strong>Status:</strong> {selectedStudent.status}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleEdit(selectedStudent)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(selectedStudent.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {formMode === 'create' ? 'Add New Student' : 'Edit Student'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    ID
                                </label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Major
                                </label>
                                <select
                                    name="major"
                                    value={formData.major}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select Major</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Business">Business</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Psychology">Psychology</option>
                                    <option value="Biology">Biology</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        GPA
                                    </label>
                                    <input
                                        type="number"
                                        name="gpa"
                                        value={formData.gpa}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        max="4"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Graduated">Graduated</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {formMode === 'create' ? 'Create' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentRecordsViewer;