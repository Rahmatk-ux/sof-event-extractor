import { useState } from "react";

export default function App() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (endpoint) => {
    try {
      setErr("");
      setLoading(true);

      const input = document.getElementById("file");
      if (!input.files.length) {
        setErr("Choose a PDF or DOCX first.");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("file", input.files[0]);

      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error(`Server ${res.status}`);

      if (endpoint === "/extract/csv") {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "events.csv";
        a.click();
        URL.revokeObjectURL(url);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setCount(data.count ?? data.events?.length ?? 0);
      setEvents(data.events || []);
      setLoading(false);
    } catch (e) {
      setErr(String(e));
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#7c7c7cff",
          padding: "15px 30px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ marginLeft: 600, fontSize: "25px" }}>
          SoF Event Extractor (Prototype)
        </h1>
      </nav>

      {/* Main Content */}
      <div
        style={{
          minHeight: "calc(100vh - 60px)",
          width:1440,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {/* File Input */}
          <div style={{ marginBottom: 15 }}>
            <input
              id="file"
              type="file"
              accept=".pdf,.docx"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => upload("/extract")}
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                marginRight: 10,
                fontWeight: 500,
              }}
            >
              {loading ? "Extracting..." : "Extract Events"}
            </button>

            <button
              onClick={() => upload("/extract/csv")}
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                border: "1px solid #2563eb",
                background: "white",
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Download CSV
            </button>
          </div>

          {/* Error */}
          {err && <p style={{ color: "crimson", marginBottom: 15 }}>{err}</p>}

          {/* Count */}
          <p style={{ marginBottom: 15 }}>
            Found: <b>{count}</b> rows
          </p>

          {/* Table */}
          {events.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ddd",
                }}
              >
                <thead style={{ background: "#1f3c76ff" }}>
                  <tr>
                    <th style={thStyle}>Event</th>
                    <th style={thStyle}>Start</th>
                    <th style={thStyle}>End</th>
                    <th style={thStyle}>Source line</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((r, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? "#fff" : "#f9fafb",
                      }}
                    >
                      <td style={{tdStyle,color:"#444",fontSize: 16}}>{r.event}</td>
                      <td style={{tdStyle,color:"#444",fontSize: 16}}>{r.start ?? ""}</td>
                      <td style={{tdStyle,color:"#444",fontSize: 16}}>{r.end ?? ""}</td>
                      <td style={{ ...tdStyle, fontSize: 16, color: "#444" }}>
                        {r.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Reusable table styles
const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};
