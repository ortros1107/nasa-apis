'use client'

import { Inter } from 'next/font/google'
import styles from '../../styles/Neows.module.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Pagination from '@/components/Pagination/Pagination'
import { paginate } from '@/utils/paginate'
import Loading from '@/components/Animations/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Neows',
}



export default function Neows() {

  const [apiKey, setApiKey] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [asteroids, setAsteroids] = useState([]);
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const changedDate = useRef(false);

  const handleStartDateChange = (event) => {
    event.preventDefault();
    setStartDate(event.target.value);
    setEndDate('');
    changedDate.current = true;
  };

  const handleEndDateChange = (event) => {
    event.preventDefault();
    setEndDate(event.target.value);
    changedDate.current = true;
  };

  const getMaxEndDate = () => {
    if (!startDate) {
      return '';
    }
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(maxEndDate.getDate() + 7);
    return maxEndDate.toISOString().slice(0, 10);
  };

  const AddARIA = () => {
    try {
      var allTables = document.querySelectorAll('table');
      for (var i = 0; i < allTables.length; i++) {
        allTables[i].setAttribute('role','table');
      }
      var allCaptions = document.querySelectorAll('caption');
      for (var i = 0; i < allCaptions.length; i++) {
        allCaptions[i].setAttribute('role','caption');
      }
      var allRowGroups = document.querySelectorAll('thead, tbody, tfoot');
      for (var i = 0; i < allRowGroups.length; i++) {
        allRowGroups[i].setAttribute('role','rowgroup');
      }
      var allRows = document.querySelectorAll('tr');
      for (var i = 0; i < allRows.length; i++) {
        allRows[i].setAttribute('role','row');
      }
      var allCells = document.querySelectorAll('td');
      for (var i = 0; i < allCells.length; i++) {
        allCells[i].setAttribute('role','cell');
      }
      var allHeaders = document.querySelectorAll('th');
      for (var i = 0; i < allHeaders.length; i++) {
        allHeaders[i].setAttribute('role','columnheader');
      }
      // this accounts for scoped row headers
      var allRowHeaders = document.querySelectorAll('th[scope=row]');
      for (var i = 0; i < allRowHeaders.length; i++) {
        allRowHeaders[i].setAttribute('role','rowheader');
      }
    } catch (e) {
      console.log("AddTableARIA(): " + e);
    }
  }

  useEffect(() => {
    axios.get("/api/Neows", {
        headers: {"request-for-key": 'key request'},
      })
      .then(response => {
        AddARIA();
        return setApiKey(response.data.apiKey);
      })
  }, [isSubmitted])

  useEffect(() => {
    axios.get(url)
  .then(response => {
    const data = Object.values(response.data.near_earth_objects);
    const flatData = data.flat();
    setAsteroids(flatData);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    setIsSubmitted(false);
    changedDate.current = false;
  });
  }, [url])

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(asteroids, currentPage, pageSize);


  return (
    <main className={styles.main} role="main">
      <form className={`${styles.form} flex`} onSubmit={(e) => {
        e.preventDefault();
        if (changedDate.current === false) {
          return;
        }
        setIsSubmitted(true);
        setUrl(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`);
        }}>
        <label className={styles.label} htmlFor="start-date">Starting date:</label>
      <input
       className={styles.input}
        type="date"
        id="start-date"
        name="start-date"
        value={startDate}
        onChange={handleStartDateChange}
        required
        title='Please enter a valid date'
      />

      <label className={styles.label} htmlFor="end-date">Ending date:</label>
      <input
       className={styles.input} 
        type="date"
        id="end-date"
        name="end-date"
        value={endDate}
        onChange={handleEndDateChange}
        min={startDate}
        max={getMaxEndDate()}
        required
        title='Please enter a valid date'
      />
          <button className={styles.button} type="submit">Search</button>
      </form>
      <section className={styles.container}>
        {
          !isSubmitted ?
        <><table className={styles.table}>
          <caption className={`${styles.caption} uppercase fs-600 text-dark`}>List of near earth asteroids</caption>
          <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Diameter (km)</th>
            <th className={styles.th}>Threat</th>
          </tr>
        </thead>
          <tbody>
            {
            paginatedPosts.map(asteroid => {
              return (
                <tr key={asteroid.id} className={styles.tr}>
                <td className={styles.td} data-cell="name">{asteroid.name}</td>
                <td className={styles.td} data-cell="date">{asteroid.close_approach_data[0].close_approach_date_full}</td>
                <td className={styles.td} data-cell="diameter">{asteroid.estimated_diameter.kilometers.estimated_diameter_min} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max}</td>
                <td className={styles.td} data-cell="threat">{asteroid.is_potentially_hazardous_asteroid == true ? "Yes" : "No"}</td>
                </tr>
              ) 
            })
            }
          </tbody>
        </table>  
   <Pagination
            items={asteroids.length} 
            currentPage={currentPage} 
            pageSize={pageSize} 
            onPageChange={onPageChange}
          /></>
          : <Loading/>}
      </section>
    </main>
  )
}