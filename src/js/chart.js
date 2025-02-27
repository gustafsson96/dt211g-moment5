import Chart from 'chart.js/auto';
import { color } from 'chart.js/helpers';


/* collect course and program data from external url */
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

/* create bar chart for 6 most popular courses */
(async function () {
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
            label: 'Antal sökande',
            data: topCourses.map(course => course.applicantsTotal),
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "6 mest sökta kurserna",
            font: {
              size: 20,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          }
        }
      }
    }
  );
})();

/* create pie chart for 5 most popular programs */
(async function () {
  const data = await getData();

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
            label: 'Antal sökande',
            data: topPrograms.map(program => program.applicantsTotal),
            backgroundColor: ["rgb(159, 43, 104)", "rgb(191, 64, 191)", "rgb(93, 63, 211)", "rgb(224, 176, 255)", "rgb(145, 95, 109)"]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "5 mest sökta programmen",
            font: {
              size: 20,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 20,
              padding: 15
            }
          }
        }
      }
    }
  );
})();