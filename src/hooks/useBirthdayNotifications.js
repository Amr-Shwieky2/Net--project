import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const useBirthdayNotifications = () => {
  const [birthdayNotifications, setBirthdayNotifications] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]); // New state for upcoming birthdays

  useEffect(() => {
    const fetchBirthdays = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupSnapshot = await getDocs(groupsCollection);
      const allNotifications = [];
      const upcomingNotifications = [];

      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7); // Set one week later date

      groupSnapshot.forEach((groupDoc) => {
        const groupData = groupDoc.data();
        const groupName = groupData.name;
        const groupId = groupDoc.id;

        groupData.students.forEach((student) => {
          if (student.birthday) {
            const birthday = new Date(student.birthday);
            birthday.setFullYear(today.getFullYear()); // Set the year to the current year to compare

            // Check if the birthday is today
            if (
              birthday.getDate() === today.getDate() &&
              birthday.getMonth() === today.getMonth()
            ) {
              allNotifications.push({ ...student, groupName, groupId });
            }

            // Check if the birthday is within the next 7 days
            if (birthday > today && birthday <= oneWeekLater) {
              upcomingNotifications.push({ ...student, groupName, groupId });
            }
          }
        });
      });

      setBirthdayNotifications(allNotifications);
      setUpcomingBirthdays(upcomingNotifications); // Set upcoming birthdays
    };

    fetchBirthdays();
  }, []);

  return { birthdayNotifications, upcomingBirthdays };
};

export default useBirthdayNotifications;
