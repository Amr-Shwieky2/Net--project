# Net@ Group Management Application

The **Net@ Group Management Application** is a comprehensive React-based web app designed to facilitate the management of groups, students, and championships within an educational program. The application integrates several key features, such as user authentication, dynamic group and student data management, championship tracking, and notifications for important events like student birthdays.

## Key Features

1. **User Authentication:**
   - Admins can log in and manage all group details.
   - Students can register for specific groups via unique registration links.
   - Secure login and logout functionality using Firebase Authentication.

2. **Group Management:**
   - Admins can create, view, and manage multiple groups.
   - Each group can have a name, description, and image.
   - Admins can generate a registration link for each group to allow new student registration.

3. **Student Management:**
   - Admins can add, view, update, and remove students from groups.
   - Students are associated with their respective groups and have attributes like name, photo, birthday, and points.

4. **Championships Tracking:**
   - Admins can open and close championships within a group.
   - Track each student’s performance during championships.
   - Automatic calculation of championship winners and a "Champion of Champions" based on accumulated points.

5. **Birthday Notifications:**
   - Admins receive notifications for student birthdays a week before the birthday date.
   - Notification dropdown shows a list of upcoming birthdays and directs admins to the respective student’s group page.

6. **Responsive and Modern Design:**
   - Application is fully responsive and adapts to different screen sizes.
   - Modern UI elements like dropdowns, tables, and modals ensure a smooth user experience.

## Technology Stack

- **Frontend:**
  - React.js: Core library for building the UI.
  - React Router: For navigation between pages.
  - Context API: For state management and authentication.
  - CSS: Custom styles for UI components.

- **Backend & Database:**
  - Firebase Firestore: NoSQL database for storing group, student, and championship data.
  - Firebase Storage: For storing and serving student photos.
  - Firebase Authentication: For managing user login and registration.

## Project Structure

```
/src
  ├── /components              # Contains all React components like Navbar, Footer, and Group Detail Page
  │   ├── About.jsx            # About Us Page
  │   ├── ClassDetailPage.jsx  # Group details page where group and championship data are managed
  │   ├── Contact.jsx          # Contact Us Page
  │   ├── Footer.jsx           # Footer Component
  │   ├── LoginRegister.jsx    # Login/Register Page
  │   ├── MainPage.jsx         # Main Landing Page for the application
  │   ├── Navbar.jsx           # Navbar with links and notifications
  │   └── StudentRegisterPage.jsx # Registration Page for Students
  ├── /config                  # Configuration files for Firebase
  ├── /context                 # Context API for managing global state
  ├── /hooks                   # Custom React hooks (e.g., `useClassDetail`, `useBirthdayNotifications`)
  ├── App.jsx                  # Root React component
  ├── index.js                 # Entry point for the React app
  └── style                    # CSS styles for different components
```

## Installation and Setup

### Prerequisites
Before setting up the project, ensure you have the following:
- **Node.js** (v12 or higher)
- **Firebase Project** with Firestore, Storage, and Authentication enabled.

### Step-by-Step Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YourRepo/NetA-Group-Management.git
   cd NetA-Group-Management
   ```

2. **Install Dependencies:**

   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Create a `.env` file in the root directory and add your Firebase configuration:

     ```
     REACT_APP_API_KEY=YOUR_FIREBASE_API_KEY
     REACT_APP_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
     REACT_APP_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
     REACT_APP_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
     REACT_APP_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
     REACT_APP_APP_ID=YOUR_FIREBASE_APP_ID
     ```

4. **Start the Application:**

   Start the development server using:

   ```bash
   npm start
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### Admin Mode
1. **Login:**
   Admin users can log in via the `/login` page.
   
2. **Group and Student Management:**
   Once logged in, navigate to a group via the main dashboard and view group details, student lists, and active championships.

3. **Birthdays Notification:**
   Notifications appear on the navbar for upcoming student birthdays. Admins can click the notification to view details.

4. **Managing Championships:**
   - Create, start, and close championships.
   - Track student points and set a championship winner.

### Student Registration
1. Students can register for specific groups using the registration link generated by the admin.
2. After registration, students will be visible on the group details page.

## Firebase Configuration

To set up Firebase services:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore**, **Authentication**, and **Storage**.
3. Update the configuration details in your `.env` file as shown in the setup instructions.

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/add-new-feature`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature/add-new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact Information

For questions or support, please reach out via:

- **Email:** shwiekyamr@gmail.com
- **LinkedIn:** [Amr Shwieky](https://www.linkedin.com/in/amr-shwieky-98714827b)
- **GitHub:** [Amr-Shwieky](https://github.com/Amr-Shwieky2)

## Acknowledgments

- Special thanks to the [Appleseeds Academy](https://www.appleseeds.org.il) for their support and guidance throughout the project.
- Thanks to all contributors and students for their valuable input and participation.
- Kudos to the Net@ project for providing the opportunity to build this application.

--- 

Let me know if you'd like to modify or expand on any section!