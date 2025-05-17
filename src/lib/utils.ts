import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import hljs from "highlight.js";
import markdownit from "markdown-it";
import { full as emoji } from "markdown-it-emoji";

type Revenue = {
  month: string;
  revenue: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

// markdown 的配置

// 配置markdown-it
export const md = markdownit({
  // html: true, // 允许HTML标签
  linkify: true, // 自动将URL文本转换为链接
  breaks: true, // 允许回车换行
  typographer: true,
  xhtmlOut: true, // 添加XHTML兼容输出
  // 显式启用blockquote规则（默认已启用）
  quotes: "“”‘’", // 配置中文引号样式
  highlight: function (str, lang): any {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
  // highlight: (code, lang) => {
  //   if (lang && hljs.getLanguage(lang)) {
  //     return hljs.highlight(lang, code).value;
  //   }
  //   return hljs.highlightAuto(code).value;
  // },
})
  .use(require("markdown-it-abbr"))
  .use(require("markdown-it-deflist"))
  .use(emoji)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-mark"))
  .use(require("markdown-it-sub"))
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-task-checkbox"), {
    disabled: false,
    divWrap: false,
    divClass: "checkbox",
    idPrefix: "cbx_",
    ulClass: "task-list",
    liClass: "task-list-item",
  });
