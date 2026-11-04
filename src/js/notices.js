const noticeRows = document.querySelector("#notice-rows");
const noticeSummary = document.querySelector("#notice-summary");
const noticePages = document.querySelector("#notice-pages");
const pageSizeSelect = document.querySelector("#notice-page-size");

let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);

const formatNoticeDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const createButton = (text, className, onClick, title) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  button.title = title;
  button.addEventListener("click", onClick);
  return button;
};

const renderPagination = (pageCount) => {
  noticePages.replaceChildren();

  const addPageButton = (label, page, { disabled = false, current = false } = {}) => {
    const button = createButton(
      label,
      `min-w-9 h-9 rounded-md border px-2 text-sm font-semibold transition ${
        current
          ? "border-primary bg-primary text-white"
          : "border-gray-200 bg-white text-black hover:bg-gray-100"
      } disabled:cursor-not-allowed disabled:text-gray-400`,
      () => {
        currentPage = page;
        renderNotices();
      },
      `Go to page ${page}`,
    );
    button.disabled = disabled;
    if (current) button.setAttribute("aria-current", "page");
    noticePages.append(button);
  };

  addPageButton("‹", Math.max(1, currentPage - 1), {
    disabled: currentPage === 1,
  });

  const visiblePages = new Set([
    1,
    pageCount,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  let previousPage = 0;

  [...visiblePages]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b)
    .forEach((page) => {
      if (page - previousPage > 1) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "px-1 text-gray-500";
        ellipsis.textContent = "…";
        noticePages.append(ellipsis);
      }
      addPageButton(String(page), page, { current: page === currentPage });
      previousPage = page;
    });

  addPageButton("›", Math.min(pageCount, currentPage + 1), {
    disabled: currentPage === pageCount,
  });
};

const renderNotices = () => {
  const pageCount = Math.max(1, Math.ceil(noticeData.length / pageSize));
  currentPage = Math.min(currentPage, pageCount);

  const pageNotices = noticeData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const rows = pageNotices.map((notice, index) => {
    const row = document.createElement("tr");
    row.className = "transition hover:bg-gray-50";

    const number = document.createElement("td");
    const topic = document.createElement("td");
    const date = document.createElement("td");
    const action = document.createElement("td");
    const cellClass = "border border-gray-200 px-3 py-2";

    [number, topic, date, action].forEach(
      (cell) => (cell.className = cellClass),
    );
    number.textContent = String((currentPage - 1) * pageSize + index + 1);
    topic.classList.add("font-ador");
    topic.textContent = notice.topic;
    date.textContent = formatNoticeDate(notice.date);
    if (notice.downloadUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.className =
        "whitespace-nowrap font-semibold text-emerald-700 hover:underline";
      downloadLink.href = notice.downloadUrl;
      downloadLink.download = "";
      downloadLink.target = "_blank";
      downloadLink.rel = "noopener noreferrer";
      downloadLink.textContent = "ডাউনলোড";
      downloadLink.title = `Download ${notice.topic}`;
      action.append(downloadLink);
    } else {
      const unavailable = document.createElement("span");
      unavailable.className = "whitespace-nowrap text-gray-400";
      unavailable.textContent = "লিংক নেই";
      unavailable.title = "Set this notice's downloadUrl in notice.js";
      action.append(unavailable);
    }

    [number, topic, date, action].forEach((cell) => row.append(cell));
    return row;
  });

  noticeRows.replaceChildren(...rows);

  const start = noticeData.length ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, noticeData.length);
  noticeSummary.textContent =
    `Showing ${start} to ${end} of ${noticeData.length} notices`;
  renderPagination(pageCount);
};

pageSizeSelect.addEventListener("change", () => {
  pageSize = Number(pageSizeSelect.value);
  currentPage = 1;
  renderNotices();
});

document.querySelector("#refresh-notices").addEventListener("click", () => {
  currentPage = 1;
  renderNotices();
});

renderNotices();
