import Chart from 'chart.js/auto';

/* bar chart */

async function getData() {
    const url = "https://studenter.miun.se/~mallar/dt211g/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

getData();

(async function() {
    const data = await getData()

    // filter out courses
    const courses = data.filter(item => item.type === "Kurs");

    // sort by total number of applicants (high to low)
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    // get the top 6 courses
    const topCourses = courses.slice(0, 6);

    new Chart(
      document.getElementById('barChart'),
      {
        type: 'bar',
        data: {
          labels: topCourses.map(course => course.name),
          datasets: [
            {
              label: 'Mest Sökta Kurserna',
              data: topCourses.map(course => course.applicantsTotal),
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        }
      }
    );
  })();

/* pie chart */
(async function() {
    const data = await getData()

    // filter out programs
    const programs = data.filter(item => item.type === "Program");

    // sort by total number of applicants (high to low)
    programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    // get the top 5 programs
    const topPrograms = programs.slice(0, 5);

    new Chart(
      document.getElementById('pieChart'),
      {
        type: 'pie',
        data: {
          labels: topPrograms.map(program => program.name),
          datasets: [
            {
              label: 'Mest Sökta Kurserna',
              data: topPrograms.map(program => program.applicantsTotal),
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        }
      }
    );
  })();