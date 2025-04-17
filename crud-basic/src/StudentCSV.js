const fs = require('fs');

// Let's create a function to generate 100,000 student records
function generateStudentData(count) {
    const records = [];
    const statusOptions = ['Active', 'On Leave', 'Graduated', 'Suspended'];
    const majorOptions = ['Computer Science', 'Business', 'Engineering', 'Psychology', 'Biology'];
    const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Mike', 'Sarah', 'Tom', 'Emily',
        'David', 'Lisa', 'Kevin', 'Jennifer', 'Ryan', 'Olivia', 'James',
        'Emma', 'William', 'Sophia', 'Andrew', 'Mia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia',
        'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Jackson', 'White',
        'Harris', 'Martin', 'Thompson', 'Young', 'Clark'];

    // Create header row
    const header = ['id', 'firstName', 'lastName', 'email', 'major', 'gpa', 'status'];
    records.push(header.join(','));

    // Generate data rows
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const id = `S-${String(i + 1).padStart(6, '0')}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@university.edu`;
        const major = majorOptions[Math.floor(Math.random() * majorOptions.length)];
        const gpa = parseFloat((Math.random() * 3 + 1).toFixed(2));
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

        const row = [
            id,
            firstName,
            lastName,
            email,
            major,
            gpa,
            status
        ];

        records.push(row.join(','));
    }

    // Write the CSV file to disk
    const csvContent = records.join('\n');
    const filePath = 'student_records_100k.csv';
    fs.writeFileSync(filePath, csvContent, 'utf8');

    console.log(`CSV file created at: ${filePath}`);
}

// Generate 100,000 records and save them to a file
generateStudentData(100000);
