"use strict";

const STORAGE_KEY = "classroom-os.workspace.v1";
const SESSION_KEY = "classroom-os.session.v1";
const DATABASE_NAME = "classroom-os-local-files";
const icons = {
  "graduation": '<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
  "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  "shield": '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  "lock": '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/>',
  "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  "eye-off": '<path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3.2 4.1"/><path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.6"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  "sparkles": '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "info": '<circle cx="12" cy="12" r="10"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  "building": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12"/><path d="M7 7h.01M17 7h.01M7 11h.01M17 11h.01M7 15h.01M17 15h.01"/>',
  "life-buoy": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.2 4.2m5.8 5.8 4.2 4.2m0-14.2-4.2 4.2m-5.8 5.8-4.2 4.2"/>',
  "more-horizontal": '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  "menu": '<path d="M4 6h16M4 12h16M4 18h16"/>',
  "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  "bell": '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  "layers": '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  "calendar": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 12 2.5 2.5L16 9"/>',
  "chart": '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
  "clipboard": '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5h6a1 1 0 0 0 1-1v-1H8v1a1 1 0 0 0 1 1Z"/><path d="M9 12h6m-6 4h6"/>',
  "file": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>',
  "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "settings": '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9L16 21h-2.8l-.4-2.2a8 8 0 0 1-1.6-.9l-1.7.7-1.4-2.4 1.5-1.1a8 8 0 0 1 0-1.9l-1.5-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9L13.2 7H16l.4 2.2a8 8 0 0 1 1.6.9l1.7-.7 1.4 2.4-1.5 1.1a8 8 0 0 1-.2 2.1Z" transform="translate(-1 -2) scale(.92)"/>',
  "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  "plus": '<path d="M12 5v14M5 12h14"/>',
  "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  "trash": '<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6"/><path d="M10 11v5m4-5v5"/>',
  "pencil": '<path d="m16 4 4 4L9 19l-5 1 1-5L16 4Z"/><path d="m14 6 4 4"/>',
  "filter": '<path d="M4 7h16M7 12h10m-7 5h4"/>',
  "check": '<path d="m5 12 4 4L19 6"/>',
  "x": '<path d="m18 6-12 12M6 6l12 12"/>',
  "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
  "wifi": '<path d="M5 12.5a11 11 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0M12 20h.01"/><path d="M2 9a16 16 0 0 1 20 0"/>',
  "award": '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.2-1.4 8.3 5.2-2.7 5.2 2.7-1.4-8.3"/>',
  "target": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13h-5a4 4 0 0 0-4 3 4 4 0 0 0-4-3H3Z"/>',
  "notebook": '<path d="M4 4h16v16H4z"/><path d="M8 4v16M4 8h4m-4 4h4m-4 4h4"/>',
  "more": '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  "edit": '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  "send": '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'
};

const today = new Date();
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const daysAgo = (amount) => {
  const date = new Date();
  date.setDate(date.getDate() - amount);
  return dateKey(date);
};
const makeSeed = () => ({
  courses: [
    { id: "c1", code: "CS401", name: "Applied Machine Learning", department: "Computer Science", faculty: "Dr. Marcus Chen", room: "Innovation Lab 2", schedule: "Mon · Wed, 10:00 AM", credits: 4, color: "purple", description: "Build practical machine learning systems, from data preparation through model evaluation.", students: 38 },
    { id: "c2", code: "DS210", name: "Data Visualization", department: "Data Science", faculty: "Prof. Elena Ruiz", room: "Studio 104", schedule: "Tue · Thu, 11:30 AM", credits: 3, color: "blue", description: "Turn complex information into clear, compelling visual stories and dashboards.", students: 42 },
    { id: "c3", code: "UX305", name: "Human-Centered Design", department: "Design", faculty: "Prof. Naomi Park", room: "Creative Hub", schedule: "Mon · Fri, 1:00 PM", credits: 3, color: "green", description: "Research and design accessible experiences that put people at the center.", students: 29 },
    { id: "c4", code: "MA220", name: "Statistics for Decisions", department: "Mathematics", faculty: "Dr. Marcus Chen", room: "North Hall 201", schedule: "Wed · Fri, 9:00 AM", credits: 4, color: "orange", description: "Use statistical thinking to make better decisions in uncertain environments.", students: 35 },
    { id: "c5", code: "CS118", name: "Web Technologies", department: "Computer Science", faculty: "Dr. Marcus Chen", room: "Digital Lab 1", schedule: "Tue · Thu, 2:00 PM", credits: 3, color: "blue", description: "Explore the foundations of the modern web and create accessible applications.", students: 31 }
  ],
  students: [
    { id: "s1", name: "Amelia Johnson", email: "amelia.johnson@northstar.edu", program: "BSc Computer Science", year: "Year 3", courses: ["c1", "c2", "c4"], avatar: "AJ" },
    { id: "s2", name: "Noah Williams", email: "noah.williams@northstar.edu", program: "BSc Data Science", year: "Year 2", courses: ["c1", "c2", "c5"], avatar: "NW" },
    { id: "s3", name: "Mia Patel", email: "mia.patel@northstar.edu", program: "BDes Interaction Design", year: "Year 3", courses: ["c2", "c3"], avatar: "MP" },
    { id: "s4", name: "Ethan Brooks", email: "ethan.brooks@northstar.edu", program: "BSc Computer Science", year: "Year 2", courses: ["c1", "c4", "c5"], avatar: "EB" },
    { id: "s5", name: "Sofia Garcia", email: "sofia.garcia@northstar.edu", program: "BSc Statistics", year: "Year 4", courses: ["c2", "c3", "c4"], avatar: "SG" },
    { id: "s6", name: "Lucas Chen", email: "lucas.chen@northstar.edu", program: "BSc Computer Science", year: "Year 1", courses: ["c1", "c3", "c5"], avatar: "LC" }
  ],
  assignments: [
    { id: "a1", title: "Model Evaluation Report", courseId: "c1", dueDate: daysAgo(-4), description: "Compare two model evaluation approaches and summarize your findings.", status: "Open", points: 25 },
    { id: "a2", title: "Visual Storytelling Project", courseId: "c2", dueDate: daysAgo(-2), description: "Create a short visual narrative from a public dataset.", status: "Open", points: 30 },
    { id: "a3", title: "Research Interview Synthesis", courseId: "c3", dueDate: daysAgo(2), description: "Share key themes from your user research interviews.", status: "Open", points: 20 },
    { id: "a4", title: "Probability Problem Set", courseId: "c4", dueDate: daysAgo(-8), description: "Complete the probability and inference exercises.", status: "Open", points: 15 },
    { id: "a5", title: "Accessible Course Landing Page", courseId: "c5", dueDate: daysAgo(-6), description: "Build a responsive, accessible course landing page.", status: "Open", points: 25 }
  ],
  submissions: [{ id: "sub1", assignmentId: "a4", studentId: "s1", text: "Completed problem set, including worked solutions for each exercise.", submittedAt: new Date().toISOString(), status: "Submitted" }],
  attendance: [],
  materials: [
    { id: "m1", courseId: "c1", name: "Week 04 · Model Evaluation.pdf", size: 1258291, type: "application/pdf", addedAt: daysAgo(1), fileId: null },
    { id: "m2", courseId: "c2", name: "Visual Storytelling Brief.pdf", size: 872448, type: "application/pdf", addedAt: daysAgo(2), fileId: null },
    { id: "m3", courseId: "c3", name: "Interview Guide.docx", size: 348160, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", addedAt: daysAgo(3), fileId: null },
    { id: "m4", courseId: "c4", name: "Statistics Formula Sheet.pdf", size: 464896, type: "application/pdf", addedAt: daysAgo(4), fileId: null }
  ],
  notifications: [
    { id: "n1", title: "New assignment posted", message: "Model Evaluation Report is due soon. Open the assignment to review the brief.", date: new Date().toISOString(), read: false, kind: "assignment" },
    { id: "n2", title: "Classroom update", message: "Applied Machine Learning meets in Innovation Lab 2 this week.", date: daysAgo(1), read: false, kind: "class" },
    { id: "n3", title: "Course material added", message: "A new resource is available in Data Visualization.", date: daysAgo(2), read: true, kind: "material" }
  ],
  schedule: [
    { day: "Mon", time: "09:00", courseId: "c3", room: "Creative Hub", faculty: "Prof. Naomi Park" },
    { day: "Mon", time: "10:00", courseId: "c1", room: "Innovation Lab 2", faculty: "Dr. Marcus Chen" },
    { day: "Tue", time: "11:30", courseId: "c2", room: "Studio 104", faculty: "Prof. Elena Ruiz" },
    { day: "Tue", time: "14:00", courseId: "c5", room: "Digital Lab 1", faculty: "Dr. Marcus Chen" },
    { day: "Wed", time: "09:00", courseId: "c4", room: "North Hall 201", faculty: "Dr. Marcus Chen" },
    { day: "Wed", time: "10:00", courseId: "c1", room: "Innovation Lab 2", faculty: "Dr. Marcus Chen" },
    { day: "Thu", time: "11:30", courseId: "c2", room: "Studio 104", faculty: "Prof. Elena Ruiz" },
    { day: "Fri", time: "13:00", courseId: "c3", room: "Creative Hub", faculty: "Prof. Naomi Park" }
  ],
  activity: [
    { id: "act1", title: "New course material uploaded", detail: "Dr. Marcus Chen · Applied Machine Learning", time: "12 minutes ago", kind: "material" },
    { id: "act2", title: "Assignment submitted", detail: "Amelia Johnson · Probability Problem Set", time: "1 hour ago", kind: "assignment" },
    { id: "act3", title: "Attendance recorded", detail: "Data Visualization · Studio 104", time: "2 hours ago", kind: "attendance" },
    { id: "act4", title: "Course enrollment updated", detail: "Web Technologies · 31 students", time: "Yesterday", kind: "course" }
  ],
  weeklyAttendance: [86, 91, 88, 94, 90, 93, 92],
  preferences: { emailNotifications: true, assignmentReminders: true, classUpdates: false, theme: "light" },
  facultyCount: 42,
  profile: { student: { name: "Amelia Johnson", email: "amelia.johnson@northstar.edu", title: "BSc Computer Science · Year 3" }, faculty: { name: "Dr. Marcus Chen", email: "marcus.chen@northstar.edu", title: "Faculty · Computer Science" }, admin: { name: "Jordan Lee", email: "jordan.lee@northstar.edu", title: "Workspace administrator" } }
});

const roles = {
  student: { label: "Student", email: "student@demo.edu", password: "classroom123", name: "Amelia Johnson" },
  faculty: { label: "Faculty", email: "faculty@demo.edu", password: "classroom123", name: "Dr. Marcus Chen" },
  admin: { label: "Admin", email: "admin@demo.edu", password: "classroom123", name: "Jordan Lee" }
};
const navigation = {
  admin: [
    { group: "Workspace", items: [["dashboard", "Overview", "chart"], ["courses", "Courses", "layers"], ["attendance", "Attendance", "check-circle"], ["students", "Students", "users"]] },
    { group: "Teaching", items: [["assignments", "Assignments", "clipboard"], ["materials", "Study materials", "book-open"], ["timetable", "Timetable", "calendar"]] },
    { group: "Personal", items: [["notifications", "Notifications", "bell"], ["profile", "My profile", "users"], ["settings", "Settings", "settings"]] }
  ],
  faculty: [
    { group: "Teaching", items: [["dashboard", "Overview", "chart"], ["courses", "My courses", "layers"], ["students", "Students", "users"], ["attendance", "Attendance", "check-circle"], ["assignments", "Assignments", "clipboard"], ["materials", "Study materials", "book-open"], ["timetable", "Timetable", "calendar"]] },
    { group: "Personal", items: [["notifications", "Notifications", "bell"], ["profile", "My profile", "users"], ["settings", "Settings", "settings"]] }
  ],
  student: [
    { group: "My learning", items: [["dashboard", "Overview", "chart"], ["courses", "My courses", "layers"], ["attendance", "My attendance", "check-circle"], ["assignments", "Assignments", "clipboard"], ["materials", "Study materials", "book-open"], ["timetable", "Timetable", "calendar"]] },
    { group: "Personal", items: [["notifications", "Notifications", "bell"], ["profile", "My profile", "users"], ["settings", "Settings", "settings"]] }
  ]
};

let state;
let currentUser = null;
let toastTimer;
let fileDatabase;
let pendingMaterialCourse = "";
const filters = {};

function icon(name, className = "") {
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
}

function seedAttendance() {
  const entries = [];
  for (let day = 6; day >= 0; day -= 1) {
    const date = daysAgo(day);
    state.students.forEach((student, studentIndex) => {
      student.courses.forEach((courseId, courseIndex) => {
        const absent = (studentIndex * 3 + courseIndex + day) % 13 === 0;
        entries.push({ id: `att-${date}-${student.id}-${courseId}`, studentId: student.id, courseId, date, status: absent ? "Absent" : "Present", source: "Class register" });
      });
    });
  }
  return entries;
}

function loadWorkspace() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Could not access the classroom workspace in browser storage.", error);
    state = makeSeed();
    state.attendance = seedAttendance();
    showToast("Browser storage is unavailable. Changes may not persist.", "error");
    return;
  }
  if (!raw) {
    state = makeSeed();
    state.attendance = seedAttendance();
    persistWorkspace();
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.courses) || !Array.isArray(parsed.attendance) || !Array.isArray(parsed.students)) {
      throw new Error("The saved classroom workspace is incomplete.");
    }
    const seed = makeSeed();
    state = { ...seed, ...parsed };
    state.preferences = { ...seed.preferences, ...parsed.preferences };
    state.profile = { ...seed.profile, ...parsed.profile };
  } catch (error) {
    console.error("Could not read the saved classroom workspace.", error);
    state = makeSeed();
    state.attendance = seedAttendance();
    persistWorkspace();
    showToast("Saved workspace data was invalid; sample data has been restored.", "error");
  }
}

function persistWorkspace() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Could not save the classroom workspace to browser storage.", error);
    showToast("Browser storage is full or unavailable. Your latest change may not persist.", "error");
    return false;
  }
}

function safe(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function initials(name) {
  return String(name || "").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " error" : ""}`;
  toast.innerHTML = `${icon(type === "error" ? "info" : "check-circle")}<span>${safe(message)}</span>`;
  root.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3700);
}

function formatDate(value, options = { month: "short", day: "numeric" }) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, options);
}

function formatTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fileSize(bytes) {
  if (!bytes) return "Browser demo file";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function activeProfile() {
  return state.profile[currentUser.role];
}

function firstName(name) {
  const parts = String(name).trim().split(/\s+/);
  return parts[0] === "Dr." || parts[0] === "Prof." ? parts[1] || parts[0] : parts[0];
}

function scopedCourses() {
  if (currentUser.role === "student") {
    const student = studentById("s1");
    return state.courses.filter((course) => student && student.courses.includes(course.id));
  }
  if (currentUser.role === "faculty") return state.courses.filter((course) => course.faculty === "Dr. Marcus Chen");
  return state.courses;
}

function scopedStudents() {
  if (currentUser.role !== "faculty") return state.students;
  const courseIds = new Set(scopedCourses().map((course) => course.id));
  return state.students.filter((student) => student.courses.some((courseId) => courseIds.has(courseId)));
}

function courseById(id) {
  return state.courses.find((course) => course.id === id);
}

function studentById(id) {
  return state.students.find((student) => student.id === id);
}

function getStudentAttendance(studentId, courseId = "") {
  const entries = state.attendance.filter((entry) => entry.studentId === studentId && (!courseId || entry.courseId === courseId));
  const present = entries.filter((entry) => entry.status === "Present").length;
  return entries.length ? Math.round((present / entries.length) * 100) : 0;
}

function weeklyAttendanceValues() {
  return Array.from({ length: 7 }, (_, index) => {
    const entries = state.attendance.filter((entry) => entry.date === daysAgo(6 - index));
    if (!entries.length) return state.weeklyAttendance[index] || 0;
    return Math.round(entries.filter((entry) => entry.status === "Present").length / entries.length * 100);
  });
}

function scheduleEntries(course) {
  const days = [...new Set(course.schedule.match(/\b(Mon|Tue|Wed|Thu|Fri)\b/g) || ["Mon"])];
  const timeMatch = course.schedule.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let time = "15:00";
  if (timeMatch) {
    let hours = Number(timeMatch[1]) % 12;
    if (timeMatch[3].toUpperCase() === "PM") hours += 12;
    time = `${String(hours).padStart(2, "0")}:${timeMatch[2]}`;
  }
  return days.map((day) => ({ day, time, courseId: course.id, room: course.room, faculty: course.faculty }));
}

function getSubmission(assignmentId, studentId = "s1") {
  return state.submissions.find((submission) => submission.assignmentId === assignmentId && submission.studentId === studentId);
}

function updateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    const name = element.dataset.icon;
    element.innerHTML = icon(name);
  });
}

function init() {
  updateIcons();
  loadWorkspace();
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("demo-toggle").addEventListener("click", toggleDemoCredentials);
  document.getElementById("primary-nav").addEventListener("click", handleNavigation);
  document.getElementById("page-content").addEventListener("click", handlePageClick);
  document.getElementById("page-content").addEventListener("submit", handlePageSubmit);
  document.getElementById("page-content").addEventListener("change", handlePageChange);
  document.getElementById("page-content").addEventListener("input", handlePageInput);
  document.getElementById("modal-root").addEventListener("click", handleModalClick);
  document.getElementById("modal-root").addEventListener("submit", handlePageSubmit);
  document.getElementById("material-file-input").addEventListener("change", handleMaterialFiles);
  document.getElementById("global-search").addEventListener("input", handleGlobalSearch);
  document.querySelector(".topbar-actions").addEventListener("click", handleGlobalResults);
  document.body.addEventListener("click", handleGlobalActions);
  document.addEventListener("keydown", handleKeyboard);
  window.addEventListener("hashchange", renderRoute);
  document.querySelectorAll(".role-option input").forEach((input) => input.addEventListener("change", updateRolePicker));
  document.querySelectorAll("[data-demo-role]").forEach((button) => button.addEventListener("click", useDemoAccount));
  renderRoute();
}

function toggleDemoCredentials() {
  const button = document.getElementById("demo-toggle");
  const panel = document.getElementById("demo-credentials");
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  panel.hidden = expanded;
}

function updateRolePicker(event) {
  document.querySelectorAll(".role-option").forEach((label) => {
    label.classList.toggle("is-selected", label.contains(event.target));
  });
  const role = event.target.value;
  document.getElementById("login-email").value = roles[role].email;
  document.getElementById("login-password").value = roles[role].password;
  document.getElementById("login-error").hidden = true;
}

function useDemoAccount(event) {
  const role = event.currentTarget.dataset.demoRole;
  document.querySelector(`.role-option input[value="${role}"]`).checked = true;
  document.querySelector(`.role-option input[value="${role}"]`).dispatchEvent(new Event("change", { bubbles: true }));
  document.getElementById("demo-credentials").hidden = true;
  document.getElementById("demo-toggle").setAttribute("aria-expanded", "false");
}

function handleLogin(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const role = form.get("role");
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const account = roles[role];
  if (!account || email !== account.email || password !== account.password) {
    const error = document.getElementById("login-error");
    error.textContent = "That demo email and password do not match. Choose a demo role or open Demo access.";
    error.hidden = false;
    return;
  }
  currentUser = { role, email: account.email };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
  } catch (storageError) {
    console.error("Could not save the demo session.", storageError);
    showToast("This browser could not save your demo session.", "error");
  }
  location.hash = "#/dashboard";
  renderRoute();
}

function restoreSession() {
  let raw;
  try {
    raw = localStorage.getItem(SESSION_KEY);
  } catch (error) {
    console.error("Could not access the demo session in browser storage.", error);
    return null;
  }
  if (!raw) return null;
  try {
    const session = JSON.parse(raw);
    if (!session || !roles[session.role] || session.email !== roles[session.role].email) return null;
    return session;
  } catch (error) {
    console.error("Could not read the demo session.", error);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function renderRoute() {
  const session = restoreSession();
  if (!session) {
    currentUser = null;
    document.getElementById("login-screen").hidden = false;
    document.getElementById("app").hidden = true;
    if (location.hash && location.hash !== "#/login") history.replaceState(null, "", `${location.pathname}${location.search}#/login`);
    return;
  }
  currentUser = session;
  document.getElementById("login-screen").hidden = true;
  document.getElementById("app").hidden = false;
  renderShell();
  const requestedRoute = (location.hash.replace(/^#\/?/, "").split("?")[0] || "dashboard").toLowerCase();
  const allowed = navigation[currentUser.role].flatMap((group) => group.items.map((item) => item[0]));
  const route = allowed.includes(requestedRoute) ? requestedRoute : "dashboard";
  if (route !== requestedRoute) history.replaceState(null, "", `${location.pathname}${location.search}#/dashboard`);
  renderPage(route);
}

function renderShell() {
  const profile = activeProfile();
  const unread = state.notifications.filter((notification) => !notification.read).length;
  document.getElementById("sidebar-name").textContent = profile.name;
  document.getElementById("sidebar-role").textContent = roles[currentUser.role].label;
  document.getElementById("topbar-name").textContent = profile.name;
  document.getElementById("topbar-role").textContent = roles[currentUser.role].label;
  document.getElementById("sidebar-avatar").textContent = initials(profile.name);
  document.getElementById("topbar-avatar").textContent = initials(profile.name);
  document.getElementById("notification-dot").hidden = unread === 0;
  document.getElementById("primary-nav").innerHTML = navigation[currentUser.role].map((group) => `
    <div class="nav-group">
      <span class="nav-group-label">${safe(group.group)}</span>
      ${group.items.map(([route, label, iconName]) => `<button class="nav-link" type="button" data-route="${route}">${icon(iconName)}<span>${safe(label)}</span>${route === "notifications" && unread ? `<span class="nav-count">${unread}</span>` : ""}</button>`).join("")}
    </div>`).join("") + `<div class="nav-group"><span class="nav-group-label">Account</span><button class="nav-link" type="button" data-action="logout">${icon("log-out")}<span>Sign out</span></button></div>`;
  document.documentElement.dataset.theme = state.preferences.theme || "light";
}

function handleNavigation(event) {
  const button = event.target.closest("[data-route]");
  if (!button) return;
  navigate(button.dataset.route);
}

function navigate(route) {
  if (!route) return;
  location.hash = `#/${route}`;
  closeSidebar();
}

function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Could not clear the demo session.", error);
  }
  currentUser = null;
  location.hash = "#/login";
  renderRoute();
  showToast("You have signed out of the demo workspace.");
}

function pageTitle(route) {
  const labels = {
    dashboard: "Overview", courses: currentUser.role === "student" ? "My courses" : "Courses",
    attendance: currentUser.role === "student" ? "My attendance" : "Attendance",
    students: "Students", assignments: "Assignments", materials: "Study materials",
    timetable: "Timetable", notifications: "Notifications", profile: "My profile", settings: "Settings"
  };
  return labels[route] || "Overview";
}

function renderPage(route) {
  const content = document.getElementById("page-content");
  document.getElementById("page-breadcrumb").textContent = pageTitle(route);
  document.querySelectorAll(".nav-link[data-route]").forEach((link) => link.classList.toggle("is-active", link.dataset.route === route));
  const page = {
    dashboard: renderDashboard, courses: renderCourses, attendance: renderAttendance,
    students: renderStudents, assignments: renderAssignments, materials: renderMaterials,
    timetable: renderTimetable, notifications: renderNotifications, profile: renderProfile, settings: renderSettings
  }[route];
  content.innerHTML = page ? page() : renderDashboard();
  updateIcons(content);
  content.focus({ preventScroll: true });
}

function heading(title, description, actions = "") {
  return `<div class="page-heading"><div><h1>${safe(title)}</h1><p>${safe(description)}</p></div><div class="heading-actions">${actions}</div></div>`;
}

function metric(label, value, trend, iconName, color = "") {
  return `<article class="metric-card"><div class="metric-top"><span>${safe(label)}</span><span class="metric-icon ${color}">${icon(iconName)}</span></div><div class="metric-value">${safe(value)}</div><div class="metric-foot"><span class="trend-up">${safe(trend)}</span><span>vs. last month</span></div></article>`;
}

function pageActions() {
  return `<span class="date-pill">${icon("calendar")} ${safe(today.toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric" }))}</span>`;
}

function renderDashboard() {
  if (currentUser.role === "student") return renderStudentDashboard();
  const title = currentUser.role === "admin" ? `Good morning, ${firstName(activeProfile().name)}` : `Welcome back, ${firstName(activeProfile().name)}`;
  const description = currentUser.role === "admin" ? "Here is what is happening across your learning community today." : "A quick look at your teaching week and learner progress.";
  const totalStudents = currentUser.role === "admin" ? String(state.students.length) : String(scopedStudents().length);
  const activeCourses = String(scopedCourses().length);
  const trend = weeklyAttendanceValues();
  const attendance = `${Math.round(trend.reduce((sum, value) => sum + value, 0) / trend.length)}%`;
  const upcoming = upcomingClasses();
  const metricCards = currentUser.role === "admin"
    ? `${metric("Total students", totalStudents, "+8.2%", "users", "blue")}
      ${metric("Faculty members", String(state.facultyCount || 42), "+2.4%", "graduation")}
      ${metric("Active courses", activeCourses, "+4.1%", "layers", "green")}
      ${metric("Active classrooms", String(new Set(state.schedule.map((item) => item.room)).size), "5 in use", "building", "blue")}
      ${metric("Average attendance", attendance, "+3.6%", "check-circle", "orange")}`
    : `${metric("My students", String(scopedStudents().length), "Across my courses", "users", "blue")}
      ${metric("My courses", activeCourses, "This semester", "layers")}
      ${metric("Assignments to review", String(state.submissions.filter((submission) => scopedCourses().some((course) => course.id === state.assignments.find((item) => item.id === submission.assignmentId)?.courseId)).length), "Learner submissions", "clipboard", "orange")}
      ${metric("Average attendance", attendance, "+3.6%", "check-circle", "green")}
      ${metric("Classrooms", String(new Set(scopedCourses().map((course) => course.room)).size), "Teaching spaces", "building", "blue")}`;
  return `${heading(title, description, pageActions())}
    <div class="metric-grid metric-grid-five">${metricCards}</div>
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-header"><div><h2>Attendance overview</h2><p>Weekly attendance across your learning community</p></div><div class="legend"><span><i></i> This week</span><span><i class="legend-muted"></i> Previous week</span></div></div>
        ${attendanceChart()}
      </section>
      <section class="panel">
        <div class="panel-header"><div><h2>Course distribution</h2><p>Active enrollments by department</p></div><button class="subtle-link" data-route="courses" type="button">View courses ${icon("arrow-right")}</button></div>
        ${courseDistribution()}
      </section>
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><div><h2>Recent activity</h2><p>The latest updates from your workspace</p></div></div>${activityList()}</section>
      <section class="panel"><div class="panel-header"><div><h2>Upcoming classes</h2><p>Your next sessions at a glance</p></div><button class="subtle-link" data-route="timetable" type="button">Full timetable ${icon("arrow-right")}</button></div>${scheduleList(upcoming)}</section>
    </div>
    <div class="dashboard-grid equal">
      <section class="panel"><div class="panel-header"><div><h2>Student performance</h2><p>Average progress across your courses</p></div><button class="subtle-link" data-route="students" type="button">View students ${icon("arrow-right")}</button></div>${performanceList()}</section>
      <section class="panel"><div class="panel-header"><div><h2>Assignments to review</h2><p>Keep feedback moving this week</p></div><button class="subtle-link" data-route="assignments" type="button">All assignments ${icon("arrow-right")}</button></div>${assignmentHighlights()}</section>
    </div>`;
}

function renderStudentDashboard() {
  const profile = activeProfile();
  const courses = state.courses.filter((course) => studentById("s1").courses.includes(course.id));
  const openAssignments = state.assignments.filter((assignment) => !getSubmission(assignment.id));
  const attendance = getStudentAttendance("s1");
  const average = Math.round(82 + Math.min(state.submissions.length, 6));
  return `${heading(`Good morning, ${profile.name.split(" ")[0]}`, "You are right on track. Here is your learning snapshot.", pageActions())}
    <div class="metric-grid">
      ${metric("Enrolled courses", String(courses.length), "On track", "layers", "blue")}
      ${metric("Due assignments", String(openAssignments.length), "Next 7 days", "clipboard", "orange")}
      ${metric("Academic progress", `${average}%`, "+4.5%", "chart")}
      ${metric("Attendance", `${attendance}%`, attendance >= 80 ? "Looking good" : "Needs attention", "check-circle", "green")}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><div><h2>My learning progress</h2><p>Your courses are moving forward</p></div><button class="subtle-link" data-route="courses" type="button">Explore courses ${icon("arrow-right")}</button></div>${studentCourseProgress(courses)}</section>
      <section class="panel"><div class="panel-header"><div><h2>Coming up</h2><p>Your next classes</p></div><button class="subtle-link" data-route="timetable" type="button">View timetable ${icon("arrow-right")}</button></div>${scheduleList(upcomingClasses())}</section>
    </div>
    <div class="dashboard-grid equal">
      <section class="panel"><div class="panel-header"><div><h2>Next deadlines</h2><p>Small steps make big progress</p></div><button class="subtle-link" data-route="assignments" type="button">All assignments ${icon("arrow-right")}</button></div>${assignmentHighlights(true)}</section>
      <section class="panel"><div class="panel-header"><div><h2>Latest updates</h2><p>Important notes from your classes</p></div><button class="subtle-link" data-route="notifications" type="button">Notifications ${icon("arrow-right")}</button></div>${activityList(true)}</section>
    </div>`;
}

function attendanceChart() {
  const values = weeklyAttendanceValues();
  const points = values.map((value, index) => `${36 + index * 62},${135 - (value - 70) * 3.2}`).join(" ");
  const area = `${points} 408,155 36,155`;
  return `<div class="chart-area"><svg viewBox="0 0 440 180" role="img" aria-label="Weekly attendance trend chart">
    <defs><linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#8172e8" stop-opacity=".2"/><stop offset="100%" stop-color="#8172e8" stop-opacity="0"/></linearGradient></defs>
    ${[30,65,100,135].map((y) => `<line x1="28" y1="${y}" x2="418" y2="${y}" class="chart-grid-line"/>`).join("")}
    <polygon points="${area}" class="chart-fill"/><polyline points="${points}" class="chart-line"/>
    ${values.map((value, index) => `<circle cx="${36 + index * 62}" cy="${135 - (value - 70) * 3.2}" r="4" class="chart-point"><title>${value}% attendance</title></circle>`).join("")}
    ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => `<text x="${36 + index * 62}" y="171" text-anchor="middle" class="chart-label">${day}</text>`).join("")}
  </svg></div>`;
}

function courseDistribution() {
  const departments = {};
  scopedCourses().forEach((course) => { departments[course.department] = (departments[course.department] || 0) + Number(course.students || 0); });
  const list = Object.entries(departments).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maximum = Math.max(...list.map(([, count]) => count), 1);
  return `<div class="course-progress">${list.map(([name, count], index) => `<div class="course-progress-item"><div class="course-progress-label"><strong>${safe(name)}</strong><span>${count} learners</span></div><div class="progress-track"><div class="progress-fill" style="width:${Math.round(count / maximum * 100)}%;${index ? `opacity:${1 - index * .12}` : ""}"></div></div></div>`).join("")}</div>`;
}

function activityList(studentOnly = false) {
  const items = state.activity.slice(0, studentOnly ? 3 : 4);
  const classes = ["", "green", "orange"];
  return `<div class="activity-list">${items.map((item, index) => `<div class="activity-item"><span class="activity-icon ${classes[index % classes.length]}">${icon(item.kind === "material" ? "file" : item.kind === "attendance" ? "check-circle" : item.kind === "course" ? "layers" : "clipboard")}</span><div class="activity-copy"><strong>${safe(item.title)}</strong><small>${safe(item.detail)} · ${safe(item.time)}</small></div></div>`).join("")}</div>`;
}

function upcomingClasses() {
  const day = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const now = new Date();
  const allowedCourses = new Set(scopedCourses().map((course) => course.id));
  const visibleSchedule = state.schedule.filter((item) => allowedCourses.has(item.courseId));
  const todayClasses = visibleSchedule.filter((item) => item.day === day && Number(item.time.replace(":", "")) >= Number(`${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`));
  const result = todayClasses.length ? todayClasses : visibleSchedule.filter((item) => item.day !== day).slice(0, 4);
  return result.slice(0, 4).map((item) => ({ ...item, next: item.day !== day }));
}

function scheduleList(items) {
  if (!items.length) return emptyState("calendar", "No upcoming classes", "Your schedule is clear for now.");
  const colors = ["", "blue", "green", "orange"];
  return `<div class="schedule-list">${items.map((item, index) => {
    const course = courseById(item.courseId);
    return `<div class="schedule-item"><span class="schedule-time">${item.next ? `${safe(item.day)} · ` : ""}${formatTime(item.time)}</span><span class="schedule-color ${colors[index % colors.length]}"></span><div class="schedule-info"><strong>${safe(course ? course.name : "Course")}</strong><small>${safe(item.room)} · ${safe(item.faculty)}</small></div></div>`;
  }).join("")}</div>`;
}

function performanceList() {
  return `<div class="course-progress">${scopedStudents().slice(0, 4).map((student, index) => {
    const score = [92, 86, 89, 78][index];
    return `<div class="course-progress-item"><div class="course-progress-label"><strong>${safe(student.name)}</strong><span>${score}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${score}%"></div></div></div>`;
  }).join("")}</div>`;
}

function studentCourseProgress(courses) {
  const scores = [82, 74, 91, 86, 78];
  return `<div class="course-progress">${courses.map((course, index) => `<div class="course-progress-item"><div class="course-progress-label"><strong>${safe(course.name)}</strong><span>${scores[index % scores.length]}% complete</span></div><div class="progress-track"><div class="progress-fill" style="width:${scores[index % scores.length]}%"></div></div></div>`).join("")}</div>`;
}

function assignmentHighlights(studentOnly = false) {
  const courseIds = new Set(scopedCourses().map((course) => course.id));
  const items = state.assignments.filter((assignment) => courseIds.has(assignment.courseId) && (!studentOnly || !getSubmission(assignment.id))).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3);
  if (!items.length) return emptyState("check-circle", "All caught up", "There are no assignments waiting for you.");
  return items.map((assignment) => {
    const course = courseById(assignment.courseId);
    return `<div class="assignment-card"><span class="assignment-symbol">${icon("clipboard")}</span><div class="assignment-copy"><strong>${safe(assignment.title)}</strong><small>${safe(course ? course.code : "Course")} · Due ${formatDate(assignment.dueDate)}</small></div><span class="status ${assignment.dueDate < dateKey(today) ? "overdue" : "pending"}">${assignment.dueDate < dateKey(today) ? "Past due" : "Open"}</span></div>`;
  }).join("");
}

function emptyState(iconName, title, description, action = "") {
  return `<div class="empty-state"><span>${icon(iconName)}</span><strong>${safe(title)}</strong><p>${safe(description)}</p>${action}</div>`;
}

function renderCourses() {
  const student = currentUser.role === "student" ? studentById("s1") : null;
  let courses = scopedCourses();
  const query = (filters["courses:search"] || "").toLowerCase();
  const department = filters["courses:department"] || "all";
  courses = courses.filter((course) => `${course.name} ${course.code} ${course.department} ${course.faculty}`.toLowerCase().includes(query) && (department === "all" || course.department === department));
  const actions = currentUser.role === "student" ? pageActions() : `<button class="button button-primary" type="button" data-action="add-course">${icon("plus")} Add course</button>`;
  return `${heading(student ? "Your learning path" : "Course management", student ? "Explore the courses in your semester." : `${state.courses.length} active courses across your learning community.`, actions)}
    <div class="filter-row">
      <label class="search-field">${icon("search")}<input type="search" data-filter="search" value="${safe(filters["courses:search"] || "")}" placeholder="Search courses..."></label>
      <select class="filter-select" data-filter="department"><option value="all">All departments</option>${[...new Set(state.courses.map((course) => course.department))].map((name) => `<option value="${safe(name)}" ${department === name ? "selected" : ""}>${safe(name)}</option>`).join("")}</select>
      ${student ? "" : `<span class="date-pill">${icon("layers")} ${state.courses.length} courses</span>`}
    </div>
    ${courses.length ? `<div class="course-grid">${courses.map(courseCard).join("")}</div>` : emptyState("search", "No courses found", "Try changing the search or department filter.")}`;
}

function courseCard(course) {
  const controls = currentUser.role === "student" ? "" : `<div class="material-actions"><button class="icon-action" type="button" data-action="edit-course" data-id="${safe(course.id)}" aria-label="Edit ${safe(course.name)}">${icon("pencil")}</button><button class="icon-action danger" type="button" data-action="delete-course" data-id="${safe(course.id)}" aria-label="Delete ${safe(course.name)}">${icon("trash")}</button></div>`;
  return `<article class="course-card"><div class="course-banner ${safe(course.color || "")}"><span class="course-code">${safe(course.code)}</span><span class="course-symbol">${icon("book-open")}</span></div><div class="course-body"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><h3>${safe(course.name)}</h3>${controls}</div><p>${safe(course.description)}</p><div class="course-meta"><span>${icon("users")} ${Number(course.students) || 0} learners</span><span>${icon("clock")} ${Number(course.credits) || 3} credits</span></div><div class="course-meta"><span>${icon("graduation")} ${safe(course.faculty)}</span><span>${safe(course.room)}</span></div></div></article>`;
}

function renderStudents() {
  const query = (filters["students:search"] || "").toLowerCase();
  const sourceStudents = scopedStudents();
  const rows = sourceStudents.filter((student) => `${student.name} ${student.email} ${student.program}`.toLowerCase().includes(query));
  const action = currentUser.role === "admin" ? `<button class="button button-primary" type="button" data-action="add-student">${icon("plus")} Add student</button>` : pageActions();
  return `${heading("Student directory", "Keep track of your learners and academic progress.", action)}
    <div class="filter-row"><label class="search-field">${icon("search")}<input type="search" data-filter="search" value="${safe(filters["students:search"] || "")}" placeholder="Search students..."></label><span class="date-pill">${icon("users")} ${sourceStudents.length} students</span></div>
    <section class="panel"><div class="panel-header"><div><h2>Enrolled learners</h2><p>Student details and current attendance</p></div></div>
      ${rows.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>STUDENT</th><th>PROGRAM</th><th>YEAR</th><th>COURSES</th><th>ATTENDANCE</th><th>STATUS</th></tr></thead><tbody>${rows.map((student, index) => `<tr><td><div class="person-cell"><span class="mini-avatar ${["", "mint", "peach", "blue"][index % 4]}">${safe(student.avatar || initials(student.name))}</span><span><strong>${safe(student.name)}</strong><small>${safe(student.email)}</small></span></div></td><td>${safe(student.program)}</td><td>${safe(student.year)}</td><td>${student.courses.length} courses</td><td>${getStudentAttendance(student.id)}%</td><td><span class="status">Active</span></td></tr>`).join("")}</tbody></table></div>` : emptyState("search", "No students found", "Try a different search term.")}</section>`;
}

function renderAttendance() {
  const courseId = filters["attendance:course"] || "all";
  const selectedDate = filters["attendance:date"] || dateKey(today);
  const studentId = currentUser.role === "student" ? "s1" : null;
  const availableCourses = currentUser.role === "student" ? scopedCourses() : scopedCourses();
  const availableCourseIds = new Set(availableCourses.map((course) => course.id));
  let rows = state.attendance.filter((entry) => entry.date === selectedDate && (!studentId || entry.studentId === studentId) && (courseId === "all" || entry.courseId === courseId) && availableCourseIds.has(entry.courseId));
  rows = rows.map((entry) => ({ ...entry, student: studentById(entry.studentId), course: courseById(entry.courseId) })).filter((entry) => entry.student && entry.course);
  const present = rows.filter((entry) => entry.status === "Present").length;
  const absent = rows.length - present;
  const rate = rows.length ? Math.round(present / rows.length * 100) : 0;
  const action = currentUser.role === "student" ? pageActions() : `<button class="button button-soft" type="button" data-action="simulate-rfid">${icon("wifi")} Simulate RFID scan</button>`;
  return `${heading(studentId ? "Your attendance" : "Attendance management", "Track daily participation across your classes.", action)}
    <div class="rfid-banner">${icon("info")}<div><strong>RFID is simulated in this demo</strong><small>No physical reader is connected. Simulated scans only update browser-stored sample records.</small></div></div>
    <div class="attendance-toolbar"><select class="filter-select" data-filter="course"><option value="all">All courses</option>${availableCourses.map((course) => `<option value="${safe(course.id)}" ${courseId === course.id ? "selected" : ""}>${safe(course.code)} · ${safe(course.name)}</option>`).join("")}</select><input class="filter-select" type="date" data-filter="date" value="${safe(selectedDate)}"></div>
    <div class="attendance-summary"><div class="attendance-chip"><span>Students recorded</span><strong>${rows.length}</strong></div><div class="attendance-chip green"><span>Present</span><strong>${present}</strong></div><div class="attendance-chip red"><span>Absent</span><strong>${absent}</strong></div><div class="attendance-chip green"><span>Attendance rate</span><strong>${rate}%</strong></div></div>
    <section class="panel"><div class="panel-header"><div><h2>${studentId ? "Attendance history" : "Daily register"}</h2><p>${safe(formatDate(selectedDate, { weekday: "long", month: "long", day: "numeric", year: "numeric" }))}</p></div></div>
      ${rows.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>STUDENT</th><th>COURSE</th><th>DATE</th><th>ATTENDANCE</th><th>RATE</th>${studentId ? "" : "<th>UPDATE</th>"}</tr></thead><tbody>${rows.map((entry) => `<tr><td><div class="person-cell"><span class="mini-avatar">${safe(entry.student.avatar || initials(entry.student.name))}</span><span><strong>${safe(entry.student.name)}</strong><small>${safe(entry.student.email)}</small></span></div></td><td>${safe(entry.course.code)}</td><td>${formatDate(entry.date)}</td><td><span class="status ${entry.status === "Absent" ? "absent" : ""}">${safe(entry.status)}${entry.source === "Simulated RFID" ? " · simulated" : ""}</span></td><td>${getStudentAttendance(entry.studentId, entry.courseId)}%</td>${studentId ? "" : `<td><div class="table-actions"><button class="text-button" type="button" data-action="set-attendance" data-id="${safe(entry.id)}" data-status="Present">Present</button><button class="text-button danger" type="button" data-action="set-attendance" data-id="${safe(entry.id)}" data-status="Absent">Absent</button></div></td>`}</tr>`).join("")}</tbody></table></div>` : emptyState("calendar", "No attendance for this date", "Select another date or add attendance using a simulated scan.")}</section>`;
}

function renderAssignments() {
  const isStudent = currentUser.role === "student";
  const query = (filters["assignments:search"] || "").toLowerCase();
  const statusFilter = filters["assignments:status"] || "all";
  const assignments = state.assignments.filter((assignment) => {
    const course = courseById(assignment.courseId);
    const submission = isStudent ? getSubmission(assignment.id) : null;
    const status = submission ? "Submitted" : assignment.dueDate < dateKey(today) ? "Past due" : "Open";
    const inScope = currentUser.role !== "faculty" || scopedCourses().some((item) => item.id === assignment.courseId);
    return inScope && `${assignment.title} ${course ? course.name : ""}`.toLowerCase().includes(query) && (statusFilter === "all" || status.toLowerCase() === statusFilter.toLowerCase());
  }).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const actions = isStudent ? pageActions() : `<button class="button button-primary" type="button" data-action="add-assignment">${icon("plus")} Create assignment</button>`;
  return `${heading(isStudent ? "Your assignments" : "Assignment management", isStudent ? "Stay on top of deadlines and submit your work." : "Create briefs, set deadlines, and review student work.", actions)}
    <div class="filter-row"><label class="search-field">${icon("search")}<input type="search" data-filter="search" value="${safe(filters["assignments:search"] || "")}" placeholder="Search assignments..."></label><select class="filter-select" data-filter="status"><option value="all">All statuses</option><option value="open" ${statusFilter === "open" ? "selected" : ""}>Open</option><option value="submitted" ${statusFilter === "submitted" ? "selected" : ""}>Submitted</option><option value="past due" ${statusFilter === "past due" ? "selected" : ""}>Past due</option></select><span class="date-pill">${icon("clipboard")} ${state.assignments.length} assignments</span></div>
    <section class="panel"><div class="panel-header"><div><h2>${isStudent ? "Coursework" : "All assignments"}</h2><p>${isStudent ? "Your progress and upcoming deadlines" : "Assignments across all courses"}</p></div></div>
      ${assignments.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>ASSIGNMENT</th><th>COURSE</th><th>DUE DATE</th><th>POINTS</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>${assignments.map((assignment) => assignmentRow(assignment, isStudent)).join("")}</tbody></table></div>` : emptyState("clipboard", "No assignments found", "Change the search or status filter.")}</section>`;
}

function assignmentRow(assignment, isStudent) {
  const course = courseById(assignment.courseId);
  const submission = isStudent ? getSubmission(assignment.id) : null;
  const status = submission ? "Submitted" : assignment.dueDate < dateKey(today) ? "Past due" : "Open";
  const badge = `<span class="status ${status === "Submitted" ? "submitted" : status === "Past due" ? "overdue" : "pending"}">${status}</span>`;
  const actions = isStudent
    ? submission ? `<span class="text-button">Submitted</span>` : `<button class="text-button" type="button" data-action="submit-assignment" data-id="${safe(assignment.id)}">Submit work</button>`
    : `<div class="table-actions"><button class="text-button" type="button" data-action="view-submissions" data-id="${safe(assignment.id)}">Submissions (${state.submissions.filter((item) => item.assignmentId === assignment.id).length})</button><button class="icon-action" type="button" data-action="edit-assignment" data-id="${safe(assignment.id)}" aria-label="Edit">${icon("pencil")}</button><button class="icon-action danger" type="button" data-action="delete-assignment" data-id="${safe(assignment.id)}" aria-label="Delete">${icon("trash")}</button></div>`;
  return `<tr><td><div class="person-cell"><span class="assignment-symbol">${icon("clipboard")}</span><span><strong>${safe(assignment.title)}</strong><small>${safe(assignment.description)}</small></span></div></td><td>${safe(course ? course.code : "Course")}</td><td>${formatDate(assignment.dueDate)}</td><td>${Number(assignment.points) || 0} pts</td><td>${badge}</td><td>${actions}</td></tr>`;
}

function renderMaterials() {
  const isStudent = currentUser.role === "student";
  const query = (filters["materials:search"] || "").toLowerCase();
  const courseId = filters["materials:course"] || "all";
  const availableCourses = currentUser.role === "student" ? scopedCourses() : scopedCourses();
  const availableCourseIds = new Set(availableCourses.map((course) => course.id));
  const materials = state.materials.filter((material) => availableCourseIds.has(material.courseId) && `${material.name} ${courseById(material.courseId)?.name || ""}`.toLowerCase().includes(query) && (courseId === "all" || material.courseId === courseId));
  const action = isStudent ? pageActions() : `<button class="button button-primary" type="button" data-action="upload-material">${icon("upload")} Upload material</button>`;
  return `${heading("Study materials", "Find and share the resources that help learning click.", action)}
    <div class="rfid-banner">${icon("info")}<div><strong>Files stay in this browser</strong><small>Uploaded files are stored locally on this device and are not shared with other users or browsers.</small></div></div>
    <div class="filter-row"><label class="search-field">${icon("search")}<input type="search" data-filter="search" value="${safe(filters["materials:search"] || "")}" placeholder="Search materials..."></label><select class="filter-select" data-filter="course"><option value="all">All courses</option>${availableCourses.map((course) => `<option value="${safe(course.id)}" ${courseId === course.id ? "selected" : ""}>${safe(course.code)} · ${safe(course.name)}</option>`).join("")}</select></div>
    ${materials.length ? `<div class="material-grid">${materials.map((material) => materialCard(material, isStudent)).join("")}</div>` : emptyState("file", "No study materials yet", "Upload a file or try another course filter.", isStudent ? "" : `<button class="button button-primary button-small" type="button" data-action="upload-material">${icon("upload")} Upload a file</button>`)}`;
}

function materialCard(material, isStudent) {
  const course = courseById(material.courseId);
  return `<article class="material-card"><span class="file-icon">${icon("file")}</span><div class="material-info"><strong title="${safe(material.name)}">${safe(material.name)}</strong><small>${safe(course ? course.code : "Course")} · ${fileSize(material.size)} · ${formatDate(material.addedAt)}</small></div><div class="material-actions"><button class="icon-action" type="button" data-action="download-material" data-id="${safe(material.id)}" aria-label="Download ${safe(material.name)}">${icon("download")}</button>${isStudent ? "" : `<button class="icon-action danger" type="button" data-action="delete-material" data-id="${safe(material.id)}" aria-label="Delete ${safe(material.name)}">${icon("trash")}</button>`}</div></article>`;
}

function renderTimetable() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["09:00", "10:00", "11:30", "13:00", "14:00"];
  return `${heading("Weekly timetable", "A clear view of your learning week.", pageActions())}
    <section class="panel"><div class="panel-header"><div><h2>Week at a glance</h2><p>Class sessions · local demo schedule</p></div><span class="date-pill">${icon("calendar")} ${safe(formatDate(dateKey(today), { month: "long", year: "numeric" }))}</span></div>
      <div class="week-scroll"><div class="week-grid"><div class="week-day">TIME</div>${days.map((day) => `<div class="week-day">${day}</div>`).join("")}${times.map((time) => `<div class="week-time">${formatTime(time)}</div>${days.map((day) => { const event = state.schedule.find((item) => item.day === day && item.time === time && scopedCourses().some((course) => course.id === item.courseId)); if (!event) return '<div class="week-cell"></div>'; const course = courseById(event.courseId); const color = course && course.color === "blue" ? "blue" : course && course.color === "green" ? "green" : ""; return `<div class="week-cell"><div class="timetable-event ${color}"><strong>${safe(course ? course.code : "Class")} · ${safe(course ? course.name : "Course")}</strong><small>${safe(event.room)} · ${safe(event.faculty)}</small></div></div>`; }).join("")}`).join("")}</div></div>
    </section>
    <div class="dashboard-grid equal" style="margin-top:14px"><section class="panel"><div class="panel-header"><div><h2>Classroom details</h2><p>Rooms and instructors</p></div></div>${scheduleList(state.schedule.slice(0, 4))}</section><section class="panel"><div class="panel-header"><div><h2>Coming up</h2><p>Next scheduled learning sessions</p></div></div>${scheduleList(upcomingClasses())}</section></div>`;
}

function renderNotifications() {
  const items = [...state.notifications].sort((a, b) => new Date(b.date) - new Date(a.date));
  return `${heading("Notifications", "A little nudge when something needs your attention.", `<button class="button button-secondary" type="button" data-action="mark-all-read">Mark all as read</button><button class="button button-secondary" type="button" data-action="clear-notifications">Clear all</button>`)}
    <section class="panel"><div class="panel-header"><div><h2>Your inbox</h2><p>${items.filter((item) => !item.read).length} unread · ${items.length} total</p></div></div>
      ${items.length ? items.map((item) => `<article class="notification-card ${item.read ? "" : "unread"}">${item.read ? "" : '<span class="unread-dot"></span>'}<span class="activity-icon ${item.kind === "class" ? "green" : item.kind === "material" ? "orange" : ""}">${icon(item.kind === "class" ? "calendar" : item.kind === "material" ? "file" : "clipboard")}</span><div class="notification-copy"><strong>${safe(item.title)}</strong><p>${safe(item.message)}</p><small>${safe(new Date(item.date).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }))}</small></div>${item.read ? "" : `<button class="text-button" type="button" data-action="mark-notification-read" data-id="${safe(item.id)}">Mark read</button>`}</article>`).join("") : emptyState("bell", "You're all caught up", "New classroom updates will appear here.")}</section>`;
}

function renderProfile() {
  const profile = activeProfile();
  return `${heading("My profile", "Your personal details in this learning workspace.", `<button class="button button-primary" type="button" data-action="edit-profile">${icon("pencil")} Edit profile</button>`)}
    <div class="profile-card"><span class="avatar">${safe(initials(profile.name))}</span><span><strong>${safe(profile.name)}</strong><small>${safe(profile.email)} · ${safe(profile.title)}</small></span></div>
    <div class="settings-grid"><section class="panel"><div class="panel-header"><div><h2>Account details</h2><p>Your workspace identity</p></div></div><div class="settings-row"><div><strong>Full name</strong><small>${safe(profile.name)}</small></div></div><div class="settings-row"><div><strong>Email address</strong><small>${safe(profile.email)}</small></div></div><div class="settings-row"><div><strong>Role</strong><small>${safe(roles[currentUser.role].label)} · Demo account</small></div></div><div class="settings-row"><div><strong>Affiliation</strong><small>${safe(profile.title)}</small></div></div></section>
    <section class="panel"><div class="panel-header"><div><h2>Workspace activity</h2><p>Personal progress snapshot</p></div></div><div class="settings-row"><div><strong>Courses</strong><small>Learning spaces you can access</small></div><strong>${currentUser.role === "student" ? studentById("s1").courses.length : state.courses.length}</strong></div><div class="settings-row"><div><strong>Attendance</strong><small>Across your recorded classes</small></div><strong>${currentUser.role === "student" ? `${getStudentAttendance("s1")}%` : `${Math.round(state.weeklyAttendance.reduce((sum, value) => sum + value, 0) / 7)}%`}</strong></div><div class="settings-row"><div><strong>Notifications</strong><small>Updates in your inbox</small></div><strong>${state.notifications.filter((item) => !item.read).length} unread</strong></div></section></div>`;
}

function renderSettings() {
  return `${heading("Settings", "Make your classroom workspace feel like yours.", "")}
    <div class="settings-grid"><section class="panel"><div class="panel-header"><div><h2>Appearance</h2><p>Choose how your workspace looks</p></div></div><div class="settings-row"><div><strong>Dark appearance</strong><small>Use a darker palette across the dashboard</small></div><label class="switch"><input type="checkbox" data-setting="theme" ${state.preferences.theme === "dark" ? "checked" : ""}><span></span></label></div></section>
    <section class="panel"><div class="panel-header"><div><h2>Notifications</h2><p>Choose which browser demo updates to show</p></div></div><div class="settings-row"><div><strong>Email notifications</strong><small>Receive important workspace updates</small></div><label class="switch"><input type="checkbox" data-setting="emailNotifications" ${state.preferences.emailNotifications ? "checked" : ""}><span></span></label></div><div class="settings-row"><div><strong>Assignment reminders</strong><small>Stay on top of your deadlines</small></div><label class="switch"><input type="checkbox" data-setting="assignmentReminders" ${state.preferences.assignmentReminders ? "checked" : ""}><span></span></label></div><div class="settings-row"><div><strong>Class updates</strong><small>Know when a class schedule changes</small></div><label class="switch"><input type="checkbox" data-setting="classUpdates" ${state.preferences.classUpdates ? "checked" : ""}><span></span></label></div></section></div>
    <section class="panel" style="margin-top:14px"><div class="panel-header"><div><h2>Demo data</h2><p>Everything lives in this browser. Reset the sample workspace to start fresh.</p></div><button class="button button-secondary" type="button" data-action="reset-data">${icon("target")} Reset sample data</button></div><p style="margin:0;color:#969eaf;font-size:8px">Authentication, course records, assignments, attendance and preferences are demonstration data, not secure or shared across users.</p></section>`;
}

function handlePageClick(event) {
  const control = event.target.closest("[data-action], [data-route]");
  if (!control) return;
  if (control.dataset.route) {
    navigate(control.dataset.route);
    return;
  }
  const { action, id } = control.dataset;
  if (action === "add-course") showCourseForm();
  else if (action === "edit-course") showCourseForm(id);
  else if (action === "delete-course") deleteCourse(id);
  else if (action === "add-student") showStudentForm();
  else if (action === "add-assignment") showAssignmentForm();
  else if (action === "edit-assignment") showAssignmentForm(id);
  else if (action === "delete-assignment") deleteAssignment(id);
  else if (action === "submit-assignment") showSubmissionForm(id);
  else if (action === "view-submissions") showSubmissions(id);
  else if (action === "upload-material") showMaterialUploadForm();
  else if (action === "download-material") downloadMaterial(id);
  else if (action === "delete-material") deleteMaterial(id);
  else if (action === "set-attendance") setAttendance(id, control.dataset.status);
  else if (action === "simulate-rfid") simulateRfid();
  else if (action === "mark-notification-read") markNotification(id);
  else if (action === "mark-all-read") markAllNotifications();
  else if (action === "clear-notifications") clearNotifications();
}

function handlePageSubmit(event) {
  const form = event.target;
  if (!form.matches("[data-form]")) return;
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const { form: formType, id } = form.dataset;
  if (formType === "course") saveCourse(data, id);
  else if (formType === "student") saveStudent(data);
  else if (formType === "assignment") saveAssignment(data, id);
  else if (formType === "submission") saveSubmission(data, id);
  else if (formType === "profile") saveProfile(data);
  else if (formType === "upload") {
    pendingMaterialCourse = data.courseId;
    closeModal();
    openMaterialPicker();
  }
}

function handlePageInput(event) {
  const filter = event.target.dataset.filter;
  if (filter === "search") {
    const key = `${currentRoute()}:${filter}`;
    filters[key] = event.target.value;
    rerenderKeepingFilter(event.target, filter);
  }
}

function handlePageChange(event) {
  const filter = event.target.dataset.filter;
  if (filter) {
    filters[`${currentRoute()}:${filter}`] = event.target.value;
    renderPage(currentRoute());
  }
  const setting = event.target.dataset.setting;
  if (setting) {
    if (setting === "theme") state.preferences.theme = event.target.checked ? "dark" : "light";
    else state.preferences[setting] = event.target.checked;
    persistWorkspace();
    document.documentElement.dataset.theme = state.preferences.theme;
    showToast("Your preferences have been saved.");
  }
}

function currentRoute() {
  return location.hash.replace(/^#\/?/, "").split("?")[0] || "dashboard";
}

function rerenderKeepingFilter(input, filter) {
  const value = input.value;
  const selection = input.selectionStart;
  renderPage(currentRoute());
  const replacement = document.querySelector(`#page-content [data-filter="${filter}"]`);
  if (replacement) {
    replacement.focus();
    replacement.value = value;
    replacement.setSelectionRange(selection, selection);
  }
}

function handleModalClick(event) {
  const close = event.target.closest("[data-modal-close]");
  if (event.target.classList.contains("modal-backdrop") || (close && !close.classList.contains("modal-backdrop"))) closeModal();
}

function openModal(title, description, body, submitLabel = "Save changes") {
  document.getElementById("modal-root").innerHTML = `<div class="modal-backdrop" data-modal-close><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${safe(title)}</h2><p>${safe(description)}</p></div><button class="modal-close" type="button" aria-label="Close dialog" data-modal-close>${icon("x")}</button></header><form class="modal-form" data-form="${safe(body.type)}" ${body.id ? `data-id="${safe(body.id)}"` : ""}><div class="form-grid">${body.fields}</div><div class="modal-actions"><button class="button button-secondary" type="button" data-modal-close>Cancel</button><button class="button button-primary" type="submit">${safe(submitLabel)}</button></div></form></section></div>`;
  updateIcons(document.getElementById("modal-root"));
  const first = document.querySelector(".modal input, .modal select, .modal textarea");
  if (first) first.focus();
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function formField(name, label, value = "", options = {}) {
  const required = options.required === false ? "" : "required";
  const full = options.full ? " full" : "";
  const type = options.type || "text";
  const placeholder = options.placeholder ? `placeholder="${safe(options.placeholder)}"` : "";
  const field = options.options
    ? `<select class="form-control" name="${safe(name)}" ${required}>${options.options.map((option) => `<option value="${safe(option.value)}" ${String(value) === String(option.value) ? "selected" : ""}>${safe(option.label)}</option>`).join("")}</select>`
    : options.textarea
      ? `<textarea class="form-control" name="${safe(name)}" ${required} ${placeholder}>${safe(value)}</textarea>`
      : `<input class="form-control" name="${safe(name)}" type="${safe(type)}" value="${safe(value)}" ${required} ${placeholder} ${options.min !== undefined ? `min="${safe(options.min)}"` : ""} ${options.max !== undefined ? `max="${safe(options.max)}"` : ""}>`;
  return `<div class="form-field${full ? " full" : ""}"><label>${safe(label)}</label>${field}${options.hint ? `<small class="form-hint">${safe(options.hint)}</small>` : ""}</div>`;
}

function showCourseForm(id = "") {
  const course = state.courses.find((item) => item.id === id) || { code: "", name: "", department: "Computer Science", faculty: "Dr. Marcus Chen", room: "", schedule: "", credits: 3, students: 0, color: "purple", description: "" };
  const colors = ["purple", "blue", "green", "orange"].map((color) => ({ value: color, label: color[0].toUpperCase() + color.slice(1) }));
  openModal(id ? "Edit course" : "Add a course", "Add useful details for your learning space.", {
    type: "course", id,
    fields: formField("code", "Course code", course.code, { required: true }) + formField("name", "Course name", course.name, { required: true }) +
      formField("department", "Department", course.department, { required: true }) + formField("faculty", "Faculty name", course.faculty, { required: true }) +
      formField("room", "Classroom", course.room, { required: true }) + formField("schedule", "Schedule", course.schedule, { required: true, placeholder: "Mon · Wed, 10:00 AM" }) +
      formField("credits", "Credits", course.credits, { type: "number", min: 1, max: 12 }) + formField("students", "Enrolled students", course.students, { type: "number", min: 0 }) +
      formField("color", "Card color", course.color, { options: colors }) +
      formField("description", "Course description", course.description, { textarea: true, full: true })
  });
}

function saveCourse(data, id) {
  const duplicate = state.courses.some((course) => course.code.toLowerCase() === data.code.trim().toLowerCase() && course.id !== id);
  if (duplicate) {
    showToast("A course with that course code already exists.", "error");
    return;
  }
  const existing = state.courses.find((course) => course.id === id);
  const course = { ...existing, ...data, id: existing ? existing.id : `c${Date.now()}`, code: data.code.trim().toUpperCase(), credits: Number(data.credits), students: Number(data.students) };
  if (existing) state.courses = state.courses.map((item) => item.id === id ? course : item);
  else state.courses.unshift(course);
  state.schedule = state.schedule.filter((item) => item.courseId !== course.id).concat(scheduleEntries(course));
  persistWorkspace();
  closeModal();
  renderPage("courses");
  showToast(existing ? "Course details updated." : "Course added to your workspace.");
}

async function deleteCourse(id) {
  const course = courseById(id);
  if (!course || !window.confirm(`Delete ${course.name}? Its related assignments and materials will also be removed.`)) return;
  const files = state.materials.filter((item) => item.courseId === id && item.fileId);
  if (files.length) {
    try {
      const database = await openFileDatabase();
      for (const material of files) await removeStoredFile(database, material.fileId);
    } catch (error) {
      console.error("Could not remove local files for the deleted course.", error);
      showToast("Course was not deleted because its browser files could not be removed.", "error");
      return;
    }
  }
  state.courses = state.courses.filter((item) => item.id !== id);
  state.students.forEach((student) => { student.courses = student.courses.filter((courseId) => courseId !== id); });
  const assignmentIds = new Set(state.assignments.filter((item) => item.courseId === id).map((item) => item.id));
  state.assignments = state.assignments.filter((item) => item.courseId !== id);
  state.submissions = state.submissions.filter((item) => !assignmentIds.has(item.assignmentId));
  state.materials = state.materials.filter((item) => item.courseId !== id);
  state.schedule = state.schedule.filter((item) => item.courseId !== id);
  state.attendance = state.attendance.filter((item) => item.courseId !== id);
  persistWorkspace();
  renderPage("courses");
  showToast("Course and related demo records deleted.");
}

function showStudentForm() {
  openModal("Add a student", "Create a learner record for the demo workspace.", {
    type: "student",
    fields: formField("name", "Full name", "", { required: true }) + formField("email", "Email address", "", { type: "email", required: true }) +
      formField("program", "Program", "", { required: true }) + formField("year", "Study year", "Year 1", { required: true }) +
      formField("courses", "Course codes (optional)", "", { required: false, full: true, placeholder: "CS401, DS210", hint: "Separate course codes with commas." })
  });
}

function saveStudent(data) {
  if (state.students.some((student) => student.email.toLowerCase() === data.email.trim().toLowerCase())) {
    showToast("A student with that email address already exists.", "error");
    return;
  }
  const codes = String(data.courses || "").split(",").map((code) => code.trim().toUpperCase()).filter(Boolean);
  const unknownCodes = codes.filter((code) => !state.courses.some((course) => course.code === code));
  if (unknownCodes.length) {
    showToast(`Course code${unknownCodes.length === 1 ? "" : "s"} not found: ${unknownCodes.join(", ")}`, "error");
    return;
  }
  const courses = state.courses.filter((course) => codes.includes(course.code)).map((course) => course.id);
  const student = { id: `s${Date.now()}`, name: data.name.trim(), email: data.email.trim(), program: data.program.trim(), year: data.year.trim(), courses, avatar: initials(data.name) };
  state.students.unshift(student);
  courses.forEach((courseId) => {
    const course = courseById(courseId);
    course.students = Number(course.students || 0) + 1;
    state.attendance.push({ id: `att-${dateKey(today)}-${student.id}-${courseId}`, studentId: student.id, courseId, date: dateKey(today), status: "Present", source: "Class register" });
  });
  persistWorkspace();
  closeModal();
  renderPage("students");
  showToast("Student added to the directory.");
}

function showAssignmentForm(id = "") {
  const assignment = state.assignments.find((item) => item.id === id) || { title: "", courseId: state.courses[0]?.id || "", dueDate: daysAgo(-7), description: "", points: 20 };
  openModal(id ? "Edit assignment" : "Create an assignment", "Give learners a clear brief and deadline.", {
    type: "assignment", id,
    fields: formField("title", "Assignment title", assignment.title, { required: true, full: true }) +
      formField("courseId", "Course", assignment.courseId, { required: true, options: state.courses.map((course) => ({ value: course.id, label: `${course.code} · ${course.name}` })) }) +
      formField("dueDate", "Due date", assignment.dueDate, { type: "date", required: true }) +
      formField("points", "Points", assignment.points, { type: "number", min: 1, max: 500 }) +
      formField("description", "Instructions", assignment.description, { textarea: true, full: true, required: true })
  });
}

function saveAssignment(data, id) {
  const existing = state.assignments.find((item) => item.id === id);
  const assignment = { ...existing, ...data, id: existing ? existing.id : `a${Date.now()}`, points: Number(data.points), status: "Open" };
  if (existing) state.assignments = state.assignments.map((item) => item.id === id ? assignment : item);
  else {
    state.assignments.unshift(assignment);
    state.notifications.unshift({ id: `n${Date.now()}`, title: "New assignment posted", message: `${assignment.title} is now available in ${courseById(assignment.courseId)?.name || "your course"}.`, date: new Date().toISOString(), read: false, kind: "assignment" });
  }
  persistWorkspace();
  closeModal();
  renderPage("assignments");
  renderShell();
  showToast(existing ? "Assignment updated." : "Assignment published to the demo workspace.");
}

function deleteAssignment(id) {
  const assignment = state.assignments.find((item) => item.id === id);
  if (!assignment || !window.confirm(`Delete the assignment "${assignment.title}" and its submissions?`)) return;
  state.assignments = state.assignments.filter((item) => item.id !== id);
  state.submissions = state.submissions.filter((item) => item.assignmentId !== id);
  persistWorkspace();
  renderPage("assignments");
  showToast("Assignment and submissions deleted.");
}

function showSubmissionForm(id) {
  const assignment = state.assignments.find((item) => item.id === id);
  if (!assignment) return;
  openModal("Submit your work", assignment.title, {
    type: "submission", id,
    fields: formField("text", "Submission note", "", { textarea: true, full: true, required: true, placeholder: "Share a short note about your work..." }) +
      `<div class="form-field full"><small class="form-hint">This browser-only demo stores a written submission note. File submissions are not uploaded to a server.</small></div>`
  }, "Submit assignment");
}

function saveSubmission(data, id) {
  state.submissions = state.submissions.filter((item) => !(item.assignmentId === id && item.studentId === "s1"));
  state.submissions.unshift({ id: `sub${Date.now()}`, assignmentId: id, studentId: "s1", text: data.text.trim(), submittedAt: new Date().toISOString(), status: "Submitted" });
  persistWorkspace();
  closeModal();
  renderPage("assignments");
  showToast("Your sample submission has been saved in this browser.");
}

function showSubmissions(id) {
  const assignment = state.assignments.find((item) => item.id === id);
  if (!assignment) return;
  const submissions = state.submissions.filter((item) => item.assignmentId === id);
  const body = submissions.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>STUDENT</th><th>SUBMITTED</th><th>WORK NOTE</th></tr></thead><tbody>${submissions.map((submission) => { const student = studentById(submission.studentId); return `<tr><td>${safe(student ? student.name : "Student")}</td><td>${safe(new Date(submission.submittedAt).toLocaleDateString())}</td><td>${safe(submission.text)}</td></tr>`; }).join("")}</tbody></table></div>` : emptyState("clipboard", "No submissions yet", "Student work will appear here as learners submit.");
  document.getElementById("modal-root").innerHTML = `<div class="modal-backdrop" data-modal-close><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>Submissions</h2><p>${safe(assignment.title)}</p></div><button class="modal-close" type="button" aria-label="Close dialog" data-modal-close>${icon("x")}</button></header><div style="padding:18px">${body}</div></section></div>`;
  updateIcons(document.getElementById("modal-root"));
}

function showMaterialUploadForm() {
  if (!scopedCourses().length) {
    showToast("There are no courses available for this role.", "error");
    return;
  }
  openModal("Upload study materials", "Choose a course, then select files stored on this device.", {
    type: "upload",
    fields: formField("courseId", "Course", scopedCourses()[0].id, { options: scopedCourses().map((course) => ({ value: course.id, label: `${course.code} · ${course.name}` })) }) +
      `<div class="form-field full"><small class="form-hint">Files are stored in this browser only and are not shared with other users.</small></div>`
  }, "Choose files");
}

function openMaterialPicker() {
  const input = document.getElementById("material-file-input");
  input.value = "";
  input.click();
}

async function handleMaterialFiles(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const course = courseById(pendingMaterialCourse);
  pendingMaterialCourse = "";
  if (!course) {
    showToast("Choose a course before selecting files.", "error");
    return;
  }
  try {
    const db = await openFileDatabase();
    for (const file of files) {
      const id = `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await storeFile(db, { id, blob: file, name: file.name, type: file.type || "application/octet-stream" });
      state.materials.unshift({ id: `m${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, fileId: id, courseId: course.id, name: file.name, size: file.size, type: file.type, addedAt: dateKey(today) });
    }
    persistWorkspace();
    renderPage("materials");
    showToast(`${files.length} file${files.length === 1 ? "" : "s"} stored in this browser.`);
  } catch (error) {
    console.error("Could not store uploaded course materials.", error);
    showToast("The browser could not store these files. Check available local storage and try smaller files.", "error");
  }
}

function openFileDatabase() {
  if (fileDatabase) return Promise.resolve(fileDatabase);
  if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB is unavailable in this browser."));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("files")) database.createObjectStore("files", { keyPath: "id" });
    };
    request.onsuccess = () => { fileDatabase = request.result; resolve(fileDatabase); };
    request.onerror = () => reject(request.error || new Error("Could not open browser file storage."));
  });
}

function storeFile(database, fileRecord) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("files", "readwrite").objectStore("files").put(fileRecord);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Could not store the file."));
  });
}

function getStoredFile(database, id) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("files", "readonly").objectStore("files").get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not read the file."));
  });
}

function removeStoredFile(database, id) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("files", "readwrite").objectStore("files").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Could not delete the file."));
  });
}

function clearStoredFiles(database) {
  return new Promise((resolve, reject) => {
    const request = database.transaction("files", "readwrite").objectStore("files").clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Could not clear local files."));
  });
}

async function downloadMaterial(id) {
  const material = state.materials.find((item) => item.id === id);
  if (!material) return;
  try {
    let file;
    let downloadName = material.name;
    if (material.fileId) {
      const record = await getStoredFile(await openFileDatabase(), material.fileId);
      if (!record || !record.blob) throw new Error("The stored file could not be found.");
      file = record.blob;
      downloadName = record.name || material.name;
    } else {
      file = new Blob([`${material.name}\n\nSample classroom resource preview.\nThis sample file is demonstration content stored by the frontend.`], { type: "text/plain" });
      downloadName = material.name.replace(/\.[^.]+$/, "") + ".txt";
    }
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Download started.");
  } catch (error) {
    console.error("Could not download the local course material.", error);
    showToast("The browser could not open this local file.", "error");
  }
}

async function deleteMaterial(id) {
  const material = state.materials.find((item) => item.id === id);
  if (!material || !window.confirm(`Delete "${material.name}" from this browser?`)) return;
  try {
    if (material.fileId) await removeStoredFile(await openFileDatabase(), material.fileId);
    state.materials = state.materials.filter((item) => item.id !== id);
    persistWorkspace();
    renderPage("materials");
    showToast("Study material deleted from this browser.");
  } catch (error) {
    console.error("Could not remove the local course material.", error);
    showToast("The browser could not delete this file.", "error");
  }
}

function setAttendance(id, status) {
  const entry = state.attendance.find((item) => item.id === id);
  if (!entry || !["Present", "Absent"].includes(status)) return;
  entry.status = status;
  entry.source = "Class register";
  persistWorkspace();
  renderPage("attendance");
  showToast(`${entry.studentId === "s1" ? "Student" : studentById(entry.studentId)?.name || "Student"} marked ${status.toLowerCase()}.`);
}

function simulateRfid() {
  const courseId = filters["attendance:course"] && filters["attendance:course"] !== "all" ? filters["attendance:course"] : state.courses[0]?.id;
  if (!courseId) return;
  const selectedDate = filters["attendance:date"] || dateKey(today);
  let candidates = state.students.filter((student) => student.courses.includes(courseId));
  if (currentUser.role === "student") candidates = candidates.filter((student) => student.id === "s1");
  const student = candidates.find((candidate) => {
    const entry = state.attendance.find((item) => item.studentId === candidate.id && item.courseId === courseId && item.date === selectedDate);
    return !entry || entry.status === "Absent";
  }) || candidates[0];
  if (!student) {
    showToast("No enrolled student is available for this simulated scan.", "error");
    return;
  }
  let entry = state.attendance.find((item) => item.studentId === student.id && item.courseId === courseId && item.date === selectedDate);
  if (entry) {
    entry.status = "Present";
    entry.source = "Simulated RFID";
  } else {
    entry = { id: `att-${Date.now()}`, studentId: student.id, courseId, date: selectedDate, status: "Present", source: "Simulated RFID" };
    state.attendance.unshift(entry);
  }
  state.activity.unshift({ id: `act${Date.now()}`, title: "Simulated RFID scan", detail: `${student.name} · ${courseById(courseId)?.code || "Class"}`, time: "Just now", kind: "attendance" });
  persistWorkspace();
  renderPage("attendance");
  showToast(`Simulated scan recorded for ${student.name}. No RFID hardware is connected.`);
}

function markNotification(id) {
  const notification = state.notifications.find((item) => item.id === id);
  if (!notification) return;
  notification.read = true;
  persistWorkspace();
  renderPage("notifications");
  renderShell();
}

function markAllNotifications() {
  state.notifications.forEach((notification) => { notification.read = true; });
  persistWorkspace();
  renderPage("notifications");
  renderShell();
  showToast("All notifications marked as read.");
}

function clearNotifications() {
  if (!state.notifications.length) return;
  if (!window.confirm("Clear all notifications from this browser?")) return;
  state.notifications = [];
  persistWorkspace();
  renderPage("notifications");
  renderShell();
  showToast("Notifications cleared.");
}

function showProfileForm() {
  const profile = activeProfile();
  openModal("Edit your profile", "Update the name and contact details shown in this workspace.", {
    type: "profile",
    fields: formField("name", "Full name", profile.name, { required: true }) +
      formField("email", "Email address", profile.email, { type: "email", required: true }) +
      formField("title", "Program or role", profile.title, { required: true, full: true })
  });
}

function saveProfile(data) {
  state.profile[currentUser.role] = { name: data.name.trim(), email: data.email.trim(), title: data.title.trim() };
  currentUser.email = roles[currentUser.role].email;
  persistWorkspace();
  closeModal();
  renderShell();
  renderPage("profile");
  showToast("Your profile has been updated.");
}

async function resetWorkspace() {
  if (!window.confirm("Reset this browser workspace to the original sample data? Your local changes will be lost.")) return;
  if (fileDatabase) {
    try {
      await clearStoredFiles(fileDatabase);
    } catch (error) {
      console.error("Could not clear uploaded browser files.", error);
      showToast("Workspace data was not reset because uploaded files could not be cleared.", "error");
      return;
    }
  }
  state = makeSeed();
  state.attendance = seedAttendance();
  persistWorkspace();
  renderShell();
  renderPage(currentRoute());
  showToast("Sample workspace restored.");
}

function handleGlobalActions(event) {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const action = control.dataset.action;
  if (action === "navigate") navigate(control.dataset.route);
  else if (action === "toggle-sidebar") toggleSidebar();
  else if (action === "close-sidebar") closeSidebar();
  else if (action === "open-profile") navigate("profile");
  else if (action === "logout") logout();
  else if (action === "edit-profile") showProfileForm();
  else if (action === "reset-data") resetWorkspace();
  else if (action === "show-help") showToast("Use the role picker on the sign-in page to explore each demo workspace.");
  else if (action === "toggle-password") togglePassword();
}

function togglePassword() {
  const input = document.getElementById("login-password");
  const button = document.querySelector("[data-action='toggle-password']");
  input.type = input.type === "password" ? "text" : "password";
  button.setAttribute("aria-label", input.type === "password" ? "Show password" : "Hide password");
  button.innerHTML = icon(input.type === "password" ? "eye" : "eye-off");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("is-open");
  document.getElementById("sidebar-backdrop").classList.toggle("is-visible");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("is-open");
  document.getElementById("sidebar-backdrop").classList.remove("is-visible");
}

function handleGlobalSearch(event) {
  const input = event.target;
  const query = input.value.trim().toLowerCase();
  const results = document.getElementById("global-search-results");
  if (!results) return;
  if (!query) {
    results.hidden = true;
    results.innerHTML = "";
    return;
  }
  const entries = [];
  scopedCourses().filter((course) => `${course.name} ${course.code} ${course.department}`.toLowerCase().includes(query)).slice(0, 4).forEach((course) => entries.push({ title: course.name, detail: `Course · ${course.code}`, route: "courses" }));
  state.assignments.filter((assignment) => `${assignment.title} ${courseById(assignment.courseId)?.name || ""}`.toLowerCase().includes(query)).slice(0, 3).forEach((assignment) => entries.push({ title: assignment.title, detail: "Assignment", route: "assignments" }));
  state.materials.filter((material) => material.name.toLowerCase().includes(query)).slice(0, 3).forEach((material) => entries.push({ title: material.name, detail: "Study material", route: "materials" }));
  if (currentUser.role !== "student") scopedStudents().filter((student) => `${student.name} ${student.email}`.toLowerCase().includes(query)).slice(0, 3).forEach((student) => entries.push({ title: student.name, detail: "Student", route: "students" }));
  results.innerHTML = entries.length ? entries.slice(0, 8).map((entry) => `<button type="button" class="global-result" data-global-route="${safe(entry.route)}"><span>${icon(entry.route === "courses" ? "layers" : entry.route === "assignments" ? "clipboard" : entry.route === "students" ? "users" : "file")}</span><span><strong>${safe(entry.title)}</strong><small>${safe(entry.detail)}</small></span>${icon("arrow-up-right")}</button>`).join("") : `<div class="global-no-results">No matching courses, assignments, materials, or students.</div>`;
  results.hidden = false;
  updateIcons(results);
}

function handleGlobalResults(event) {
  const result = event.target.closest("[data-global-route]");
  if (!result) return;
  navigate(result.dataset.globalRoute);
  document.getElementById("global-search").value = "";
  document.getElementById("global-search-results").hidden = true;
}

function handleKeyboard(event) {
  if (event.key === "Escape") {
    closeModal();
    closeSidebar();
    const results = document.getElementById("global-search-results");
    if (results) results.hidden = true;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("global-search").focus();
  }
}

init();
