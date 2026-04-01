// Chart.js defaults for dark theme
Chart.defaults.color = '#666';
Chart.defaults.borderColor = '#e0e8e0';

const blue = '#a8e06c';
const yellow = '#4caf7d';
const white = '#1a2e1a';
const muted = '#666';

// 1. Out-of-School Children by Country (Bar)
new Chart(document.getElementById('chart-oos-country'), {
  type: 'bar',
  data: {
    labels: ['Bangladesh', 'Bhutan', 'India', 'Pakistan', 'Sri Lanka'],
    datasets: [{
      label: 'Out-of-School Children (millions)',
      data: [3.7, 0.02, 10.1, 17.7, 0.03],
      backgroundColor: [blue, yellow, blue, yellow, blue],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) { return value + 'M'; }
        }
      }
    }
  }
});

// 2. Literacy Rates by Country (Bar)
new Chart(document.getElementById('chart-literacy'), {
  type: 'bar',
  data: {
    labels: ['Bangladesh', 'Bhutan', 'India', 'Pakistan', 'Sri Lanka'],
    datasets: [{
      label: 'Literacy Rate (%)',
      data: [75, 67, 77, 58, 92],
      backgroundColor: [blue, yellow, blue, yellow, blue],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) { return value + '%'; }
        }
      }
    }
  }
});

// 3. Kids in School vs Not (Pie)
new Chart(document.getElementById('chart-pie'), {
  type: 'pie',
  data: {
    labels: ['In School', 'Not in School'],
    datasets: [{
      data: [87, 13],
      backgroundColor: [blue, yellow],
      borderColor: '#ffffff',
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: { size: 14 },
          generateLabels: function(chart) {
            var data = chart.data;
            return data.labels.map(function(label, i) {
              return {
                text: label + ' (' + data.datasets[0].data[i] + '%)',
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              };
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ' ' + context.raw + '%';
          }
        }
      }
    }
  }
});

// 3b. Child Labor Donut Chart
// ~26 million child laborers out of ~600 million children in South Asia
new Chart(document.getElementById('chart-donut'), {
  type: 'doughnut',
  data: {
    labels: ['In School or At Home', 'Working Instead of School'],
    datasets: [{
      data: [96, 4],
      backgroundColor: [blue, yellow],
      borderColor: '#ffffff',
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: { size: 14 },
          generateLabels: function(chart) {
            var data = chart.data;
            return data.labels.map(function(label, i) {
              return {
                text: label + ' (' + data.datasets[0].data[i] + '%)',
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              };
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ' ' + context.raw + '%';
          }
        }
      }
    }
  }
});

// 4. School Enrollment Over the Years (Line)
new Chart(document.getElementById('chart-enrollment'), {
  type: 'line',
  data: {
    labels: ['2000', '2005', '2010', '2015', '2020', '2024'],
    datasets: [{
      label: 'Enrollment Rate',
      data: [72, 79, 85, 89, 88, 87],
      borderColor: blue,
      backgroundColor: blue + '33',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: blue
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ' Enrollment Rate: ' + context.raw + '%';
          }
        }
      }
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        ticks: {
          callback: function(value) { return value + '%'; }
        }
      }
    }
  }
});

// 5. Out-of-School Children Over Time (Line)
new Chart(document.getElementById('chart-oos-time'), {
  type: 'line',
  data: {
    labels: ['2000', '2005', '2010', '2015', '2020', '2024'],
    datasets: [{
      label: 'Out-of-School Children',
      data: [52, 42, 35, 30, 32, 32],
      borderColor: yellow,
      backgroundColor: yellow + '33',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: yellow
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ' Out-of-School Children: ' + context.raw + 'M';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) { return value + 'M'; }
        }
      }
    }
  }
});
