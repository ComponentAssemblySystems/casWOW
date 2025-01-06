---
layout: base.njk
title: Welcome, Username
toolBar: buttons
toolbarButtonOne: "December 2024"
toolbarButtonTwo: "CAS - NY"
tabBar: false
badge: true
badgeText: "Admin"
eleventyNavigation:
  key: Dashboard
  order: 0
---

<!-- <sl-include src="_partials/cards-horizontal"></sl-include> -->

<div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title">Receivables</h5>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="fa-solid fa-sliders"></i>
        </button>
      </div>
      <div class="card-body">
        <canvas id="receivablesChart"></canvas>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title">Hours</h5>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="fa-solid fa-sliders"></i>
        </button>
      </div>
      <div class="card-body">
        <canvas id="hoursChart"></canvas>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title">Costs</h5>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="fa-solid fa-sliders"></i>
        </button>
      </div>
      <div class="card-body">
        <canvas id="costsChart"></canvas>
      </div>
    </div>
  </div>
</div>
  <!-- <div class="custom-placeholder"></div> -->

<script>
  // Sample data
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const actualHours = [120, 150, 130, 160, 170, 180];
  const budgetHours = [140, 160, 120, 150, 160, 170];

  // Chart configuration
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Actual Hours',
        data: actualHours,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Budget Hours',
        data: budgetHours,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Actual Hours vs Budget Hours (6-Month Period)'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Render the chart
  const ctx = document.getElementById('hoursChart').getContext('2d');
  new Chart(ctx, config);
</script>
<script>
    // Sample data
    const monthCosts = ['January', 'February', 'March', 'April', 'May', 'June'];
    const actualCosts = [2000, 2500, 2300, 2800, 3000, 3200];
    const budgetCosts = [2200, 2400, 2100, 2600, 2900, 3100];

    // Chart configuration
    const sampleCostsChart = {
      labels: monthCosts,
      datasets: [
        {
          label: 'Actual Costs ($)',
          data: actualCosts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Budget Costs ($)',
          data: budgetCosts,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
      ]
    };

    const sampleCostsChartConfig = {
      type: 'bar',
      data: sampleCostsChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Actual Costs vs Budget Costs (6-Month Period)'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Costs ($)'
            }
          }
        }
      }
    };

    // Render the chart
    const ctxCostsChart = document.getElementById('costsChart').getContext('2d');
    new Chart(ctxCostsChart, sampleCostsChartConfig);
  </script>

<script>
    // Sample data
    const monthsReceivables = ['January', 'February', 'March', 'April', 'May', 'June'];
    const amountInvoiced = [5000, 5200, 4800, 5300, 5500, 6000];
    const amountPaid = [4500, 5000, 4700, 5100, 5400, 5800];
    const retainage = [500, 200, 100, 200, 100, 200];

    // Chart configuration
    const sampleReceivablesChart = {
      labels: monthsReceivables,
      datasets: [
        {
          label: 'Amount Invoiced ($)',
          data: amountInvoiced,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Amount Paid ($)',
          data: amountPaid,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Retainage ($)',
          data: retainage,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
      ]
    };

    const sampleReceivablesChartConfig = {
      type: 'bar',
      data: sampleReceivablesChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Receivables: Amount Invoiced vs Amount Paid vs Retainage'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)'
            }
          }
        }
      }
    };

    // Render the chart
    const ctxReceivablesChart = document.getElementById('receivablesChart').getContext('2d');
    new Chart(ctxReceivablesChart, sampleReceivablesChartConfig);
  </script>
