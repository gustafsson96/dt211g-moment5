"use strict";

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

/**
 * Collects course and program data from external url.
 * @returns {Promise<Array>} Promise of an array of course and program objects.
 */
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

/**
 * Fetches and filters out course data. 
 * Creates horizontal bar chart showcasing the 6 most popular courses.
 */
async function createBarChart() {
  const barChartEl = document.getElementById('barChart');
  if (!barChartEl) return;

  const data = await getData()

  // Filtered out courses
  const courses = data.filter(item => item.type === "Kurs");

  // Sorts number of applicants from high to low
  courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

  // 6 most popular courses
  const topCourses = courses.slice(0, 6);

  new Chart(
    barChartEl,
    {
      type: 'bar',
      data: {
        labels: topCourses.map(course => course.name),
        datasets: [
          {
            label: 'Antal sökande',
            data: topCourses.map(course => course.applicantsTotal),
            backgroundColor: 'rgb(191, 64, 191, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              font: {
                size: 10,
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "MIUNs populäraste kurser HT23",
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
};

/**
 * Fetches and filters out program data.
 * Creates pie chart showcasing the 5 most popular programs.
 */
async function createPieChart() {
  const pieChartEl = document.getElementById('pieChart');
  if (!pieChartEl) return;

  const data = await getData();

  // Filtered out programs
  const programs = data.filter(item => item.type === "Program");

  // Sorts number of applicants from high to low
  programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

  // 5 most popular programs
  const topPrograms = programs.slice(0, 5);

  new Chart(
    pieChartEl,
    {
      type: 'pie',
      data: {
        labels: topPrograms.map(program => program.name),
        datasets: [
          {
            label: 'Antal sökande',
            data: topPrograms.map(program => program.applicantsTotal),
            backgroundColor: ["rgb(159, 43, 104)", "rgb(191, 64, 191)", "rgb(93, 63, 211)", "rgb(169, 92, 104, 0.8)", "rgb(145, 95, 109)"]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "MIUNs populäraste program HT23",
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
          },
          datalabels: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          formatter: (value) => value
        }
      },
      plugins: [ChartDataLabels]
    }
  );
};

createBarChart();
createPieChart();