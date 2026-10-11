// Standalone frontend logic for Compliance Knowledge Base
document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('complianceTable');
  const tbody = document.getElementById('complianceTableBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addManualRowBtn');
  const exportBtn = document.getElementById('exportCsvBtn');
  const searchInput = document.getElementById('searchInput');
  const rowCountBadge = document.getElementById('rowCountBadge');

  function updateRowCount() {
    const visibleRows = Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display !== 'none');
    rowCountBadge.textContent = `${visibleRows.length} Items Listed`;
  }

  // 1. Search / Filter Filter
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
    updateRowCount();
  });

  // 2. Add New Manual Row
  addRowBtn.addEventListener('click', () => {
    const headerCount = table.querySelectorAll('thead th').length;
    const tr = document.createElement('tr');

    for (let i = 0; i < headerCount - 1; i++) {
      const td = document.createElement('td');
      td.contentEditable = "true";
      td.innerHTML = i === 0 ? "<strong>New Jurisdiction / State</strong>" : "Click to edit text";
      tr.appendChild(td);
    }

    const actionTd = document.createElement('td');
    actionTd.className = 'action-cell';
    actionTd.innerHTML = '<button class="btn-delete" title="Delete Row">✕</button>';
    tr.appendChild(actionTd);

    tbody.prepend(tr);
    updateRowCount();
    tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // 3. Delete Row Handler
  tbody.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-delete')) {
      const row = e.target.closest('tr');
      if (confirm('Are you sure you want to remove this law entry?')) {
        row.remove();
        updateRowCount();
      }
    }
  });

  // 4. Robust CSV/TSV Parser
  function parseCSV(text) {
    const delimiter = text.includes('\t') && !text.includes(',') ? '\t' : ',';
    const lines = [];
    let row = [];
    let inQuotes = false;
    let field = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(field.trim());
        field = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(field.trim());
        if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
          lines.push(row);
        }
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
    if (field || row.length > 0) {
      row.push(field.trim());
      lines.push(row);
    }
    return lines;
  }

  // 5. File Upload Handler
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const text = event.target.result;
        const rows = parseCSV(text);

        if (!rows || rows.length < 2) {
          alert('Uploaded file does not have enough rows or valid tabular data.');
          return;
        }

        const headers = rows[0];
        const dataRows = rows.slice(1);

        // Update thead
        const thead = table.querySelector('thead');
        thead.innerHTML = '';
        const headTr = document.createElement('tr');
        headers.forEach(h => {
          const th = document.createElement('th');
          th.textContent = h;
          headTr.appendChild(th);
        });
        const actionTh = document.createElement('th');
        actionTh.textContent = 'Actions';
        headTr.appendChild(actionTh);
        thead.appendChild(headTr);

        // Update tbody
        tbody.innerHTML = '';
        dataRows.forEach(row => {
          if (row.every(c => !c)) return;
          const tr = document.createElement('tr');
          headers.forEach((_, idx) => {
            const td = document.createElement('td');
            td.contentEditable = "true";
            td.textContent = row[idx] || '';
            tr.appendChild(td);
          });
          const actionTd = document.createElement('td');
          actionTd.className = 'action-cell';
          actionTd.innerHTML = '<button class="btn-delete" title="Delete Row">✕</button>';
          tr.appendChild(actionTd);
          tbody.appendChild(tr);
        });

        document.getElementById('activeTableTitle').textContent = `Loaded Data: ${file.name}`;
        updateRowCount();
        alert(`Successfully imported "${file.name}"!`);
      } catch (err) {
        console.error(err);
        alert('Could not parse file. Make sure it is a valid CSV or export from Excel.');
      }
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  // 6. CSV Export Function
  exportBtn.addEventListener('click', () => {
    const rows = [];
    const headers = Array.from(table.querySelectorAll('thead th')).slice(0, -1).map(th => `"${th.textContent.replace(/"/g, '""')}"`);
    rows.push(headers.join(','));

    table.querySelectorAll('tbody tr').forEach(tr => {
      if (tr.style.display !== 'none') {
        const cells = Array.from(tr.querySelectorAll('td')).slice(0, -1).map(td => `"${td.innerText.replace(/"/g, '""')}"`);
        rows.push(cells.join(','));
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'US_Mandatory_PTO_Compliance_Laws.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  updateRowCount();
});
