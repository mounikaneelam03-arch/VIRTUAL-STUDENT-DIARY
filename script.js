
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const pageId =
      location.pathname.split("/").pop().replace(".html", "") || "home";
    const ns = (k) => `diary:${pageId}:${k}`;

    const container = document.querySelector(".container") || document;

    const fields = Array.from(
      container.querySelectorAll(
        'textarea, input[type="text"], input[type="number"], input[type="email"], input[type="date"]'
      )
    );

    fields.forEach((el, i) => {
      const key = ns(el.id || el.name || `field${i}`);
      el.dataset.storeKey = key;

      const saved = localStorage.getItem(key);
      if (saved !== null) el.value = saved;

      el.addEventListener("input", () => {
        localStorage.setItem(key, el.value);
      });
      el.addEventListener("change", () => {
        localStorage.setItem(key, el.value);
      });
    });

    const saveBtn = container.querySelector("button");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
      
        fields.forEach((el) => {
          localStorage.setItem(el.dataset.storeKey, el.value);
        });

      
        handleAttendanceList();

        toast("Saved!");
      });
    }

    
    function handleAttendanceList() {
      const dateInput = document.getElementById("attendance");
      if (!dateInput || !dateInput.value) return;

      const listKey = ns("dates");
            const current = JSON.parse(localStorage.getItem(listKey) || "[]");

      if (!current.includes(dateInput.value)) current.push(dateInput.value);
      current.sort(); 

      localStorage.setItem(listKey, JSON.stringify(current));
      renderAttendance(current);
    }

    function renderAttendance(arr = null) {
      const listEl = document.getElementById("attendanceList");
      const countEl = document.getElementById("attendanceCount");
      if (!listEl && !countEl) return;

      const listKey = ns("dates");
      const data = arr || JSON.parse(localStorage.getItem(listKey) || "[]");

      if (listEl) {
        listEl.innerHTML = "";
        data.forEach((d) => {
          const li = document.createElement("li");
          li.textContent = d;
          listEl.appendChild(li);
        });
      }
      if (countEl) countEl.textContent = data.length;
    }

    renderAttendance();

  
    function toast(msg) {
      const t = document.createElement("div");
      t.textContent = msg;
      Object.assign(t.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 14px",
        background: "#4a90e2",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity .2s ease"
      });
      document.body.appendChild(t);
      requestAnimationFrame(() => (t.style.opacity = 1));
      setTimeout(() => {
        t.style.opacity = 0;
        setTimeout(() => t.remove(), 200);
      }, 1200);
    }
  });
})();
saveGoalBtn.addEventListener('click', () => {
  console.log("Save button clicked");  // Debug log

  const text = goalInput.value.trim();
  if (!text) {
    alert("Please enter a goal.");
    return;
  }

  const newGoal = {
    text,
    date: new Date().toLocaleDateString(),
    completed: false
  };

  const goals = JSON.parse(localStorage.getItem('studentGoals')) || [];
  goals.unshift(newGoal);
  localStorage.setItem('studentGoals', JSON.stringify(goals));

  goalInput.value = '';
  renderGoals(goals);

  // Show "Saved ✓" temporarily
  saveGoalBtn.textContent = "Saved ✓";
  saveGoalBtn.disabled = true;
  setTimeout(() => {
    saveGoalBtn.textContent = "Save Goal";
    saveGoalBtn.disabled = false;
  }, 1500);
});
