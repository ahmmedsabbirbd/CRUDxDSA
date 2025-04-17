import React, { useState, useEffect } from 'react';

// Import the data generation utility directly
const generateStudentData = (count = 1) => {
    console.time('Data Generation');
    const students = [];

    // Helper function to generate random date between two dates
    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Helper function to generate random student ID with format S-XXXXX
    const generateStudentId = (index) => {
        return `S-${String(index).padStart(5, '0')}`;
    };

    // Generate a single random student record
    const generateRandomStudent = (index) => {
        const firstNames = [
            'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
            'David', 'Susan', 'Joseph', 'Jessica', 'Charles', 'Sarah', 'Thomas', 'Karen', 'Daniel', 'Nancy',
            'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Dorothy', 'Donald', 'Sandra', 'Steven', 'Ashley',
            'Paul', 'Kimberly', 'Andrew', 'Donna', 'Joshua', 'Emily', 'Kenneth', 'Michelle', 'Kevin', 'Amanda',
            'Brian', 'Melissa', 'George', 'Deborah', 'Edward', 'Stephanie', 'Ronald', 'Rebecca', 'Timothy', 'Laura'
        ];

        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
            'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
            'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
            'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
        ];

        const majors = [
            'Computer Science', 'Business Administration', 'Mechanical Engineering', 'Biology', 'Psychology',
            'Electrical Engineering', 'Economics', 'Chemistry', 'Mathematics', 'Communications',
            'English Literature', 'Political Science', 'Physics', 'Nursing', 'Marketing',
            'Finance', 'History', 'Sociology', 'Civil Engineering', 'Graphic Design',
            'Architecture', 'Environmental Science', 'Philosophy', 'Music', 'Education',
            'Journalism', 'Computer Engineering', 'Accounting', 'Anthropology', 'Criminal Justice'
        ];

        const campuses = ['Main Campus', 'North Campus', 'South Campus', 'Online'];
        const status = ['Active', 'On Leave', 'Graduated', 'Suspended'];
        const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
        const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

        // Generate random values
        const studentId = generateStudentId(index + 1);
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const major = majors[Math.floor(Math.random() * majors.length)];
        const gpa = parseFloat((Math.random() * 3 + 1).toFixed(2)); // GPA between 1.00 and 4.00
        const creditHours = Math.floor(Math.random() * 120) + 1; // 1-120 credit hours
        const campus = campuses[Math.floor(Math.random() * campuses.length)];
        const currentStatus = status[Math.floor(Math.random() * status.length)];
        const grade = grades[Math.floor(Math.random() * grades.length)];

        // Generate enrollment date between 2015 and 2023
        const enrollmentDate = randomDate(new Date(2015, 0, 1), new Date(2023, 11, 31));

        // Generate expected graduation date 4-6 years after enrollment
        const graduationYear = enrollmentDate.getFullYear() + 4 + Math.floor(Math.random() * 3);
        const expectedGraduation = new Date(graduationYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

        // Generate email using name and random number
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@university.edu`;

        // Generate phone number
        const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

        // Generate address
        const address = `${Math.floor(Math.random() * 9000) + 1000} ${['Main', 'Oak', 'Maple', 'Park', 'Elm', 'Pine', 'Cedar', 'Hill'][Math.floor(Math.random() * 8)]} ${['St', 'Ave', 'Rd', 'Blvd', 'Dr', 'Ln', 'Way', 'Ct'][Math.floor(Math.random() * 8)]}`;
        const city = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][Math.floor(Math.random() * 10)];
        const state = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'][Math.floor(Math.random() * 10)];
        const zip = `${Math.floor(Math.random() * 90000) + 10000}`;

        return {
            id: studentId,
            firstName,
            lastName,
            email,
            gender,
            phone,
            address,
            city,
            state,
            zip,
            major,
            gpa,
            enrollmentDate,
            expectedGraduation,
            creditHours,
            campus,
            status: currentStatus,
            grade
        };
    };

    for (let i = 0; i < count; i++) {
        students.push(generateRandomStudent(i));
    }

    console.timeEnd('Data Generation');
    console.log(`Successfully generated ${students.length} student records.`);

    return students;
};

// Generate a smaller dataset for testing
const generateTestStudentData = (count = 100000) => {
    return generateStudentData(count);
};

// Define constants for form fields
const MAJORS = [
    'Computer Science', 'Business Administration', 'Mechanical Engineering', 'Biology', 'Psychology',
    'Electrical Engineering', 'Economics', 'Chemistry', 'Mathematics', 'Communications',
    'English Literature', 'Political Science', 'Physics', 'Nursing', 'Marketing',
    'Finance', 'History', 'Sociology', 'Civil Engineering', 'Graphic Design',
    'Architecture', 'Environmental Science', 'Philosophy', 'Music', 'Education',
    'Journalism', 'Computer Engineering', 'Accounting', 'Anthropology', 'Criminal Justice'
];

const CAMPUSES = ['Main Campus', 'North Campus', 'South Campus', 'Online'];
const STATUSES = ['Active', 'On Leave', 'Graduated', 'Suspended'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const GRADES = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

// Empty student template
const emptyStudent = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    major: '',
    gpa: 0,
    enrollmentDate: new Date(),
    expectedGraduation: new Date(),
    creditHours: 0,
    campus: '',
    status: 'Active',
    grade: ''
};

// Main App Component - Student Records Viewer
const StudentRecordsViewer = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    // New state for CRUD operations
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create', 'edit'
    const [formData, setFormData] = useState({...emptyStudent});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [nextStudentId, setNextStudentId] = useState(0);

    useEffect(() => {
        // Load data when component mounts
        loadStudentData();
    }, []);

    const loadStudentData = () => {
        setLoading(true);
        try {
            // Generate 1000 records for better testing with less memory overhead
            const data = generateTestStudentData(100000);
            setStudents(data);

            // Set the next ID based on the highest existing ID
            const highestId = data.reduce((max, student) => {
                const idNum = parseInt(student.id.split('-')[1]);
                return idNum > max ? idNum : max;
            }, 0);

            setNextStudentId(highestId + 1);
        } catch (error) {
            console.error('Error loading student data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort students based on current sort configuration
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Get current page of students
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentStudents = sortedStudents.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle sort
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Format date for display
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Handle row click to view student details
    const handleRowClick = (student) => {
        setSelectedStudent(student === selectedStudent ? null : student);
    };

    // Handle changing records per page
    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    // Open create student form
    const handleCreateStudent = () => {
        const newStudentData = {
            ...emptyStudent,
            id: `S-${String(nextStudentId).padStart(5, '0')}`,
            enrollmentDate: new Date(),
            expectedGraduation: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
            status: 'Active', // Default status
            gender: GENDERS[0], // Default to first gender option
            campus: CAMPUSES[0], // Default to first campus option
            grade: GRADES[0] // Default to first grade option
        };

        console.log("Creating new student with initial data:", newStudentData);
        setFormData(newStudentData);
        setFormMode('create');
        setIsFormOpen(true);
    };

    // Open edit student form
    const handleEditStudent = (student) => {
        // Create a deep copy of the student to avoid reference issues
        const studentCopy = JSON.parse(JSON.stringify(student));

        // Convert date strings back to Date objects if needed
        if (typeof studentCopy.enrollmentDate === 'string') {
            studentCopy.enrollmentDate = new Date(studentCopy.enrollmentDate);
        }
        if (typeof studentCopy.expectedGraduation === 'string') {
            studentCopy.expectedGraduation = new Date(studentCopy.expectedGraduation);
        }

        console.log("Editing student:", studentCopy);
        setFormData(studentCopy);
        setFormMode('edit');
        setIsFormOpen(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Special handling for numeric fields
        if (name === 'gpa') {
            setFormData({
                ...formData,
                [name]: parseFloat(value) || 0
            });
        } else if (name === 'creditHours') {
            setFormData({
                ...formData,
                [name]: parseInt(value) || 0
            });
        } else if (name === 'enrollmentDate' || name === 'expectedGraduation') {
            setFormData({
                ...formData,
                [name]: new Date(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Debug logging to verify state updates
        console.log(`Updated ${name} to:`, value);
    };

    // Handle form submission
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Form data:", formData);

        // Validate form data
        if (!formData.firstName || !formData.lastName || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Create a clean copy of the form data with proper type conversions
        const processedData = {
            ...formData,
            gpa: parseFloat(formData.gpa) || 0,
            creditHours: parseInt(formData.creditHours) || 0,
            enrollmentDate: formData.enrollmentDate instanceof Date ? formData.enrollmentDate : new Date(formData.enrollmentDate),
            expectedGraduation: formData.expectedGraduation instanceof Date ? formData.expectedGraduation : new Date(formData.expectedGraduation)
        };

        console.log("Processed data:", processedData);
        console.log("Current form mode:", formMode);

        if (formMode === 'create') {
            // Add new student
            console.log("Adding new student");
            const newStudents = [...students, processedData];
            setStudents(newStudents);
            setNextStudentId(nextStudentId + 1);
            console.log("New student count:", newStudents.length);
            // Show success message
            alert(`Student ${processedData.firstName} ${processedData.lastName} created successfully!`);
        } else {
            // Update existing student
            console.log("Updating student with ID:", processedData.id);
            const updatedStudents = students.map(student =>
                student.id === processedData.id ? processedData : student
            );
            setStudents(updatedStudents);

            // Update selected student if it's the one being edited
            if (selectedStudent && selectedStudent.id === processedData.id) {
                setSelectedStudent(processedData);
            }
            // Show success message
            alert(`Student ${processedData.firstName} ${processedData.lastName} updated successfully!`);
        }

        // Close form
        setIsFormOpen(false);
    };

    // Open delete confirmation modal
    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setIsDeleteModalOpen(true);
    };

    // Confirm student deletion
    const confirmDelete = () => {
        const updatedStudents = students.filter(student => student.id !== studentToDelete.id);
        setStudents(updatedStudents);

        // Clear selected student if it's the one being deleted
        if (selectedStudent && selectedStudent.id === studentToDelete.id) {
            setSelectedStudent(null);
        }

        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-xl">Loading student records...</div>
            </div>
        );
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
                {/* Search, Filters and Action Buttons */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div className="w-full md:w-2/3">
                            <input
                                type="text"
                                placeholder="Search by ID, name, email, major or status..."
                                className="w-full p-2 border rounded"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                            />
                        </div>
                        <div className="w-full md:w-1/3 flex items-center justify-end gap-2">
                            <label htmlFor="recordsPerPage">Show:</label>
                            <select
                                id="recordsPerPage"
                                className="p-2 border rounded"
                                value={recordsPerPage}
                                onChange={handleRecordsPerPageChange}
                            >
                                <option value={1000}>1000</option>
                                <option value={10000}>10000</option>
                                <option value={20000}>10000</option>
                            </select>
                            <span>records</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCreateStudent}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create New Student
                        </button>
                    </div>
                </div>

                {/* Student Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('id')}>
                                    ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('firstName')}>
                                    First Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('lastName')}>
                                    Last Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('email')}>
                                    Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('major')}>
                                    Major {sortConfig.key === 'major' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('gpa')}>
                                    GPA {sortConfig.key === 'gpa' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border cursor-pointer" onClick={() => requestSort('status')}>
                                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentStudents.length > 0 ? (
                                currentStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={`hover:bg-gray-50 ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.id}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.firstName}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.lastName}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.email}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.major}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.gpa.toFixed(2)}</td>
                                        <td className="p-2 border cursor-pointer" onClick={() => handleRowClick(student)}>{student.status}</td>
                                        <td className="p-2 border">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditStudent(student);
                                                    }}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(student);
                                                    }}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-4 text-center">No students found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-2 md:mb-0">
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredStudents.length)} of {filteredStudents.length} students
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => paginate(1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                            >
                                First
                            </button>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                            >
                                Previous
                            </button>

                            {[...Array(Math.ceil(filteredStudents.length / recordsPerPage)).keys()].map(number => (
                                // Only show a few page numbers around the current page
                                (number + 1 === 1 ||
                                    number + 1 === Math.ceil(filteredStudents.length / recordsPerPage) ||
                                    (number + 1 >= currentPage - 1 && number + 1 <= currentPage + 1)) && (
                                    <button
                                        key={number + 1}
                                        onClick={() => paginate(number + 1)}
                                        className={`px-3 py-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                                    >
                                        {number + 1}
                                    </button>
                                )
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredStudents.length / recordsPerPage)}
                                className={`px-3 py-1 border rounded ${currentPage === Math.ceil(filteredStudents.length / recordsPerPage) ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => paginate(Math.ceil(filteredStudents.length / recordsPerPage))}
                                disabled={currentPage === Math.ceil(filteredStudents.length / recordsPerPage)}
                                className={`px-3 py-1 border rounded ${currentPage === Math.ceil(filteredStudents.length / recordsPerPage) ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                            >
                                Last
                            </button>
                        </div>
                    </div>
                </div>

                {/* Student Details */}
                {selectedStudent && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Student Details</h2>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                    onClick={() => handleEditStudent(selectedStudent)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                    onClick={() => handleDeleteClick(selectedStudent)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Delete
                                </button>
                                <button
                                    className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded flex items-center"
                                    onClick={() => setSelectedStudent(null)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-lg mb-3">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                                <p className="mb-2"><strong>ID:</strong> {selectedStudent.id}</p>
                                <p className="mb-2"><strong>Email:</strong> {selectedStudent.email}</p>
                                <p className="mb-2"><strong>Gender:</strong> {selectedStudent.gender}</p>
                                <p className="mb-2"><strong>Phone:</strong> {selectedStudent.phone}</p>
                                <p className="mb-2"><strong>Address:</strong> {selectedStudent.address}, {selectedStudent.city}, {selectedStudent.state} {selectedStudent.zip}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-3">Academic Information</h3>
                                <p className="mb-2"><strong>Major:</strong> {selectedStudent.major}</p>
                                <p className="mb-2"><strong>GPA:</strong> {selectedStudent.gpa.toFixed(2)}</p>
                                <p className="mb-2"><strong>Enrollment Date:</strong> {formatDate(selectedStudent.enrollmentDate)}</p>
                                <p className="mb-2"><strong>Expected Graduation:</strong> {formatDate(selectedStudent.expectedGraduation)}</p>
                                <p className="mb-2"><strong>Credit Hours:</strong> {selectedStudent.creditHours}</p>
                                <p className="mb-2"><strong>Campus:</strong> {selectedStudent.campus}</p>
                                <p className="mb-2"><strong>Status:</strong> {selectedStudent.status}</p>
                                <p className="mb-2"><strong>Grade:</strong> {selectedStudent.grade}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Student Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {formMode === 'create' ? 'Create New Student' : 'Edit Student'}
                                </h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmitForm} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold">Personal Information</h3>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                            <input
                                                type="text"
                                                name="id"
                                                value={formData.id}
                                                readOnly
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                <option value="">Select Gender</option>
                                                {GENDERS.map(gender => (
                                                    <option key={gender} value={gender}>{gender}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Academic Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold">Academic Information</h3>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Major</label>
                                            <select
                                                name="major"
                                                value={formData.major}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                <option value="">Select Major</option>
                                                {MAJORS.map(major => (
                                                    <option key={major} value={major}>{major}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">GPA</label>
                                            <input
                                                type="number"
                                                name="gpa"
                                                min="0"
                                                max="4"
                                                step="0.01"
                                                value={formData.gpa}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                                            <input
                                                type="date"
                                                name="enrollmentDate"
                                                value={formData.enrollmentDate instanceof Date ? formData.enrollmentDate.toISOString().split('T')[0] : ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Expected Graduation</label>
                                            <input
                                                type="date"
                                                name="expectedGraduation"
                                                value={formData.expectedGraduation instanceof Date ? formData.expectedGraduation.toISOString().split('T')[0] : ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Credit Hours</label>
                                            <input
                                                type="number"
                                                name="creditHours"
                                                min="0"
                                                max="200"
                                                value={formData.creditHours}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Campus</label>
                                            <select
                                                name="campus"
                                                value={formData.campus}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                <option value="">Select Campus</option>
                                                {CAMPUSES.map(campus => (
                                                    <option key={campus} value={campus}>{campus}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Status</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                {STATUSES.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700">Grade</label>
                                            <select
                                                name="grade"
                                                value={formData.grade}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            >
                                                <option value="">Select Grade</option>
                                                {GRADES.map(grade => (
                                                    <option key={grade} value={grade}>{grade}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        {formMode === 'create' ? 'Create Student' : 'Update Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="mb-6">
                                Are you sure you want to delete student <strong>{studentToDelete?.firstName} {studentToDelete?.lastName}</strong> (ID: {studentToDelete?.id})? This action cannot be undone.
                            </p>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <footer className="bg-gray-800 text-white mt-auto py-6">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Student Records Management System</p>
                </div>
            </footer>
        </div>
    );
};

export default StudentRecordsViewer;