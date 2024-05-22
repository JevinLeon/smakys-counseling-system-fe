import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportPdf = async ({ title, name }) => {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.text(title, 7, 15);

  doc.autoTable({
    html: "#my-table",
    startY: 25,
    theme: "grid",
  });

  doc.save(name);
};

export default exportPdf;
