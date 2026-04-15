const SUPABASE_URL = "https://hdrhpxgqrrcwofmvhhhc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcmhweGdxcnJjd29mbXZoaGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjIzNjQsImV4cCI6MjA5MTgzODM2NH0.8atgmNyJnuNp07cH87lJAA92i3QE_5WH_Hv7Daf6leA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Detect page
const path = window.location.pathname;

// Homepage logic
if (path.endsWith("index.html") || path === "/") {
    loadHome();
}

// Jam page logic
if (path.endsWith("jam.html")) {
    loadJam();
}

// Past jams page
if (path.includes("past-jams")) {
    loadPastJams();
}

// ----------------------
// FUNCTIONS
// ----------------------

async function loadHome() {
    const { data, error } = await supabaseClient
        .from("jams")
        .select("*")
        .eq("status", "active")
        .limit(1);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    const container = document.getElementById("current-jam");

    if (error) {
        container.textContent = "Error loading jam";
        return;
    }

    if (!data || data.length === 0) {
        container.textContent = "No active jam";
        return;
    }

    const jam = data[0];

    container.innerHTML = `
        <h3>${jam.title}</h3>
        <p>Theme: ${jam.theme}</p>
        <a href="jam.html?id=${jam.jam_id}">View Jam</a>
    `;
}

function loadJam() {
    const title = document.getElementById("jam-title");
    if (title) {
        title.textContent = "Future Jam Title";
    }
}

function loadPastJams() {
    const list = document.getElementById("past-jams-list");
    if (list) {
        list.textContent = "Future: list past jams";
    }
}