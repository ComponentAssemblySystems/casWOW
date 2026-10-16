/* Behaviors for the library-based demo screens. */
(() => {
  const announce = (message) => {
    document.querySelector("[data-announcement]").textContent = message;
  };
  const officeLabel = document.querySelector("[data-office-label]");
  const officeChoices = [...document.querySelectorAll("[data-office]")];
  const selectOffice = (office) => {
    officeLabel.textContent = office;
    document.querySelector("[data-office-selection]").textContent = office;
    officeChoices.forEach((choice) => {
      const active = choice.dataset.office === office;
      choice.classList.toggle("active", active);
      if (active) choice.setAttribute("aria-current", "true");
      else choice.removeAttribute("aria-current");
    });
  };
  if (officeLabel) {
    const savedOffice = localStorage.getItem("caswow-office");
    if (officeChoices.some((choice) => choice.dataset.office === savedOffice)) selectOffice(savedOffice);
    officeChoices.forEach((choice) => choice.addEventListener("click", () => {
      selectOffice(choice.dataset.office);
      localStorage.setItem("caswow-office", choice.dataset.office);
      announce(`${choice.dataset.office} selected. Demo sample records remain unchanged.`);
    }));
  }
  const setHidden = (element, hidden) => {
    element.hidden = hidden;
    element.classList.toggle("d-none", hidden);
  };
  const table = document.querySelector("[data-project-table]");
  if (table) {
    const rows = [...table.querySelectorAll("[data-project-row]")];
    const search = table.querySelector("[data-project-search]");
    let selected = "active";
    const filter = () => {
      const term = search.value.trim().toLowerCase();
      rows.forEach((row) => {
        setHidden(row, row.dataset.status !== selected || !row.dataset.search.includes(term));
      });
      const visible = rows.filter((row) => !row.hidden).length;
      table.querySelector("[data-result-count]").textContent =
        `${visible} ${selected} project${visible === 1 ? "" : "s"}${term ? " matching your search" : ""}`;
      setHidden(table.querySelector("[data-no-projects]"), visible !== 0);
    };
    table.querySelectorAll("button[data-status]").forEach((button) => {
      table.querySelector(
        `[data-count="${button.dataset.status}"]`,
      ).textContent = rows.filter(
        (row) => row.dataset.status === button.dataset.status,
      ).length;
      button.addEventListener("click", () => {
        selected = button.dataset.status;
        table.querySelectorAll("button[data-status]").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        filter();
      });
    });
    search.addEventListener("input", filter);
    filter();
  }
  document.querySelectorAll("[data-sample-list]").forEach((list) => {
    const search = list.querySelector("[data-sample-search]");
    const category = list.querySelector("[data-sample-category]");
    const items = [...list.querySelectorAll("[data-sample-item]")];
    const filter = () => {
      const term = search.value.trim().toLowerCase();
      const selected = category?.value || "all";
      items.forEach((item) => {
        setHidden(item, !item.textContent.toLowerCase().includes(term) ||
          (selected !== "all" && item.dataset.category !== selected));
      });
      const count = items.filter((item) => !item.hidden).length;
      setHidden(list.querySelector("[data-sample-empty]"), count !== 0);
      list.querySelector("[data-sample-count]").textContent =
        `${count} of ${items.length} results`;
    };
    search.addEventListener("input", filter);
    category?.addEventListener("change", filter);
    filter();
  });
  document
    .querySelector("[data-sample-form]")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      document.querySelector("[data-form-result]").textContent =
        `Sample preferences applied: ${data.get("displayName")} — ${data.get("view")}. Changes remain on this page only.`;
    });
  const chatForm = document.querySelector("[data-chat-form]");
  if (chatForm) {
    const messages = document.querySelector("[data-chat-messages]");
    const initialMessage = messages.firstElementChild.cloneNode(true);
    const respond = (question) => {
      const user = document.createElement("p");
      user.textContent = `You: ${question}`;
      const answer = document.createElement("p");
      const normalized = question.toLowerCase();
      let text, destination, label;
      if (/cost|bill|contract|payment/.test(normalized)) {
        text =
          "Demo assistant: N819 has $5,638,679 in sample costs against an adjusted contract of $8,751,689. These are illustrative values. ";
        destination = "costs/cost-summary/";
        label = "Open N819 cost summary";
      } else if (/hour|budget|completion/.test(normalized)) {
        text =
          "Demo assistant: N819 shows 48,585 actual hours, 75,738 equated hours and 96% completion in the sample. ";
        destination = "costs/xpress/";
        label = "Compare project hours";
      } else if (/drawing|plan/.test(normalized)) {
        text =
          "Demo assistant: The sample drawing register contains three example sheets. Preview images are historical references, not project drawings. ";
        destination = "plans/";
        label = "Open sample drawing register";
      } else {
        text =
          "Demo assistant: This scripted demo covers project costs, hours and drawings. Try one of those topics or browse the reports. ";
        destination = "reports/";
        label = "Browse sample reports";
      }
      answer.textContent = text;
      const link = document.createElement("a");
      link.href = new URL(
        destination,
        document.querySelector("[data-home]").href,
      ).href;
      link.textContent = label;
      answer.append(link);
      messages.append(user, answer);
      messages.scrollTop = messages.scrollHeight;
    };
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = chatForm.elements.message;
      const question = input.value.trim();
      if (!question) return;
      respond(question);
      input.value = "";
      input.focus();
    });
    document
      .querySelectorAll("[data-chat-topic]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          respond(button.dataset.chatTopic),
        ),
      );
    document
      .querySelector("[data-chat-reset]")
      .addEventListener("click", () => {
        messages.replaceChildren(initialMessage.cloneNode(true));
        chatForm.reset();
        chatForm.elements.message.focus();
        announce("Sample conversation reset.");
      });
  }
  document
    .querySelector("[data-print]")
    ?.addEventListener("click", () => window.print());
  document.querySelector("[data-export]")?.addEventListener("click", () => {
    let rows;
    const project = document.querySelector("[data-project-export]");
    if (table) {
      rows = [...table.querySelectorAll("tr")]
        .filter((row) => !row.hidden)
        .map((row) =>
          [...row.cells].map((cell) =>
            cell.innerText.replace(/\s+/g, " ").trim(),
          ),
        );
    } else if (project) {
      const data = JSON.parse(project.dataset.projectExport);
      rows = [
        ["Project", data.id],
        ["Name", data.name],
        ...[...project.querySelectorAll("dl")].flatMap((list) =>
          [...list.querySelectorAll("dt")].map((label) => [
            label.textContent.trim(),
            label.nextElementSibling.textContent.trim(),
          ]),
        ),
      ];
    } else if (document.body.dataset.screen === "dashboard") {
      rows = [
        ["Location costs", "Value", "Basis"],
        ...[...document.querySelectorAll("[data-metric]")].map((metric) => [
          metric.querySelector("dt").textContent,
          ...[...metric.querySelectorAll("dd")].map((item) => item.textContent),
        ]),
      ];
      document.querySelectorAll("details table").forEach((chart) => {
        rows.push(
          [],
          [chart.caption.textContent],
          ...[...chart.rows].filter((row) => !row.hidden).map((row) =>
            [...row.cells].map((cell) => cell.textContent),
          ),
        );
      });
    } else {
      const main = document.querySelector("main");
      rows = [
        [document.querySelector("h1").textContent.trim()],
        ["Illustrative sample data - Oct 16, 2026"],
      ];
      main.querySelectorAll("table").forEach((dataTable) => {
        rows.push(
          [],
          [dataTable.caption?.textContent || "Sample data"],
          ...[...dataTable.rows]
            .filter((row) => !row.hidden)
            .map((row) =>
              [...row.cells].map((cell) =>
                cell.textContent.replace(/\s+/g, " ").trim(),
              ),
            ),
        );
      });
      if (!main.querySelector("table")) {
        const items = [...main.querySelectorAll("[data-sample-item]")].filter(
          (item) => !item.hidden,
        );
        items.forEach((item) =>
          rows.push([item.textContent.replace(/\s+/g, " ").trim()]),
        );
        main
          .querySelectorAll("dl")
          .forEach((list) =>
            [...list.querySelectorAll("dt")].forEach((label) =>
              rows.push([
                label.textContent.trim(),
                label.nextElementSibling.textContent.trim(),
              ]),
            ),
          );
        const form = main.querySelector("[data-sample-form]");
        if (form) rows.push(...new FormData(form).entries());
        main
          .querySelectorAll("[data-chat-messages] p")
          .forEach((message) => rows.push([message.textContent.trim()]));
        if (rows.length === 2)
          main
            .querySelectorAll("article")
            .forEach((item) =>
              rows.push([item.textContent.replace(/\s+/g, " ").trim()]),
            );
      }
    }
    // Quote CSV and neutralize spreadsheet formulas at the file boundary.
    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const text = String(value);
            return `"${(/^[=+@-]/.test(text) ? "'" + text : text).replaceAll('"', '""')}"`;
          })
          .join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `caswow-${project ? JSON.parse(project.dataset.projectExport).id : table ? "xpress" : document.body.dataset.screen}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce("CSV exported.");
  });
  const charts = [];
  const timeframe = document.querySelector("[data-chart-timeframe]");
  timeframe?.addEventListener("change", () => {
    const months = Number(timeframe.value);
    const start = 6 - months;
    const period = timeframe.selectedOptions[0].textContent;
    document.querySelectorAll("[data-chart-panel]").forEach((panel) => {
      const canvas = panel.querySelector("[data-chart]");
      const source = JSON.parse(canvas.dataset.chart);
      const chart = charts.find((item) => item.canvas === canvas);
      if (chart) {
        chart.data.labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"].slice(start);
        chart.data.datasets.forEach((series, index) => {
          series.data = source.series[index].values.slice(start);
        });
        chart.update();
      }
      panel.querySelector("[data-chart-period]").textContent = period;
      canvas.setAttribute("aria-label", `${source.title} for ${period}. Exact values are in the data table below.`);
      panel.querySelectorAll("[data-chart-month]").forEach((row) => setHidden(row, Number(row.dataset.chartMonth) < start));
    });
    announce(`Charts filtered to ${period}. Location costs are overall totals.`);
  });
  const token = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const redraw = () =>
    charts.forEach((chart) => {
      chart.data.datasets.forEach((series) => {
        series.backgroundColor = token(series.token);
      });
      chart.options.color = token("--cas-fgColor-muted");
      for (const axis of Object.values(chart.options.scales)) {
        axis.ticks.color = token("--cas-fgColor-muted");
        axis.grid.color = token("--cas-borderColor-muted");
      }
      chart.update();
    });
  document
    .querySelector("[data-theme-toggle]")
    .addEventListener("click", (event) => {
      const dark = document.documentElement.dataset.bsTheme !== "dark";
      const theme = dark ? "dark" : "light";
      document.documentElement.dataset.bsTheme = theme;
      localStorage.setItem("caswow-theme", theme);
      document.documentElement.style.setProperty("--dashboard-background", dark ? "var(--cas-bgColor-muted)" : "#F4F6F7");
      event.currentTarget.setAttribute(
        "aria-label",
        `Switch to ${dark ? "light" : "dark"} theme`,
      );
      redraw();
    });
  document.querySelector("[data-theme-toggle]").setAttribute("aria-label", `Switch to ${document.documentElement.dataset.bsTheme === "dark" ? "light" : "dark"} theme`);
  const renderCharts = () => {
    if (!document.querySelector("[data-chart]")) return;
    if (typeof Chart === "undefined") {
      announce(
        "Charts could not load. Exact values remain available under View chart data.",
      );
      return;
    }
    Chart.defaults.font.family = token("--cas-font-family-sans-serif");
    Chart.defaults.font.size = 12;
    document.querySelectorAll("[data-chart]").forEach((canvas) => {
      const data = JSON.parse(canvas.dataset.chart);
      const roles = {
        brand: "--cas-fgColor-brand",
        neutral: "--cas-fgColor-muted",
        muted: "--cas-fgColor-disabled",
      };
      charts.push(
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: data.labels || ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: data.series.map((series) => ({
              label: series.label,
              data: series.values,
              token: roles[series.role],
              backgroundColor: token(roles[series.role]),
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            color: token("--cas-fgColor-muted"),
            plugins: {
              legend: {
                position: "top",
                labels: { boxWidth: 12, boxHeight: 12 },
              },
            },
            scales: {
              x: {
                ticks: { color: token("--cas-fgColor-muted") },
                grid: { display: false },
              },
              y: {
                beginAtZero: true,
                ticks: { color: token("--cas-fgColor-muted") },
                grid: { color: token("--cas-borderColor-muted") },
              },
            },
          },
        }),
      );
    });
  };
  document.fonts.ready.then(renderCharts);
  const restore = document.querySelector("[data-restore]");
  document.querySelectorAll("[data-hide-chart]").forEach((button) =>
    button.addEventListener("click", () => {
      const panel = document.querySelector(
        `[data-chart-panel="${button.dataset.hideChart}"]`,
      );
      const title = panel.querySelector("h2").textContent;
      setHidden(panel, true);
      setHidden(restore, false);
      restore.focus();
      announce(
        `${title} chart hidden. Use Restore hidden charts to show it again.`,
      );
    }),
  );
  restore?.addEventListener("click", () => {
    document.querySelectorAll("[data-chart-panel]").forEach((panel) => {
      setHidden(panel, false);
    });
    setHidden(restore, true);
    document
      .querySelector("[data-hide-chart]")
      ?.closest(".dropdown")
      .querySelector("button")
      .focus();
    announce("All charts restored.");
  });
})();
