// src/utils/generateStudentData.js

/**
 * Function to generate 100,000 random student records
 * This can be imported and used to populate your application with initial data
 */

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

// Main function to generate the complete dataset
export const generateStudentData = (count = 100000) => {
    console.time('Data Generation');
    const students = [];

    for (let i = 0; i < count; i++) {
        students.push(generateRandomStudent(i));

        // Log progress for large datasets
        if (i > 0 && i % 10000 === 0) {
            console.log(`Generated ${i} records...`);
        }
    }

    console.timeEnd('Data Generation');
    console.log(`Successfully generated ${students.length} student records.`);

    return students;
};

// Usage example:
// const students = generateStudentData();
// console.log(`Generated ${students.length} student records.`);

// Export a smaller dataset for development/testing
export const generateTestStudentData = (count = 100) => {
    return generateStudentData(count);
};

// This function allows you to persist the generated data to localStorage
// to avoid regenerating on each page refresh during development
export const getOrGenerateStudentData = (count = 100000) => {
    const storageKey = 'studentData';

    try {
        // Check if we already have data in localStorage
        const storedData = localStorage.getItem(storageKey);

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // Convert string dates back to Date objects
            parsedData.forEach(student => {
                student.enrollmentDate = new Date(student.enrollmentDate);
                student.expectedGraduation = new Date(student.expectedGraduation);
            });

            console.log(`Loaded ${parsedData.length} student records from localStorage.`);
            return parsedData;
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
    }

    // If we don't have stored data or encountered an error, generate new data
    const newData = generateStudentData(count);

    try {
        // Try to store in localStorage for future use
        localStorage.setItem(storageKey, JSON.stringify(newData));
        console.log('Student data saved to localStorage.');
    } catch (error) {
        // This will happen if the data is too large for localStorage (usually >5MB)
        console.warn('Could not save student data to localStorage:', error);
    }

    return newData;
};